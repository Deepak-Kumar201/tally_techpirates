const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const resolveJWT = require("../middleware/resolveJWT");
const bcrypt = require("bcrypt");

const isValid = (name) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(name)){
        return (true)
    }
    return (false)
  
}

router.post("/signup", async (req, resp) => {
    try {
        var name = req.body.name,
        email= req.body.email,
        password= req.body.password;

        if (!isValid(email)) {
            resp.status(400).send({ "error": "Please take valid Email" });
            return;
        }
        
        if(name.trim().length < 3){
            resp.status(400).send({ "error": "Please take valid Name" });
            return;
        }

        if(password.trim().length < 8){
            resp.status(400).send({ "error": "Please take valid password" });
            return;
        }

        var  oldData = await User.findOne({ email: req.body.email });
        if (oldData != null) {
            resp.send({ "error": "Email exists try another email" });
            return;
        }

        password = await bcrypt.hash(password, 10);
        
		const newUser = new User({
			name : name,
			email: email,
			password: password,
		})


		newUser.save();

		var jwtTokken = jwt.sign({
			id: newUser.id
		}, "hj4h5432j5h$$Fh5i348u98**HU(*YGY$G#JH#)");

        resp.cookie("token", jwtTokken, {httpOnly:true}).send({ "success": "Signed Up"});

	} catch (err){
        console.log(err)
		resp.status(500).send({ "error": "Some server error occured try after some time" });
	}

});

router.post("/signin", async (req, resp) => {
	try {
		const oldData = await User.findOne({ email: req.body.email});

		if (oldData == null) {
			resp.status(404).send({ "error": "Email not registered" });
			return;
		}

        if(await bcrypt.compare(req.body.password, oldData.password) === false){
            resp.status(401).send({"error":"User details invalid"})
            return;
        }

		var jwtTokken = jwt.sign({
			id: oldData.id
		}, "hj4h5432j5h$$Fh5i348u98**HU(*YGY$G#JH#)");

		resp.cookie("token", jwtTokken, {httpOnly:true}).send({ "success": "Logged in"});
	} catch (err){
        console.log(err);
		resp.status(500).send({ "error": "Some server error occured try after some time" });
	}
});

router.post('/auth' , resolveJWT, async (req , res)=>{
    try {
        const userData = await User.findById(req.body.id);
        if(!userData){
            res.status(404).send({error:"User not found"});
            return;
        }
        userData.password = "";
        res.send({"user": userData});
    } catch (error) {
		resp.status(500).send({ "error": "Some server error occured try after some time" });
    }
})

router.put("/updatePassword", resolveJWT, async(req, resp)=>{
    try {
		const oldData = await User.findById(req.body.id);

        if (oldData == null) {
			resp.status(404).send({ "error": "Email not registered" });
			return;
		}

        if(await bcrypt.compare(req.body.password, oldData.password) === false){
            resp.status(401).send({"error":"User details invalid"})
        }
        password = await bcrypt.hash(req.body.newPassword, 10);

        await User.findByIdAndUpdate(req.body.id, {
            $set : {
                password : password
            }
        });

		resp.send({ "success": "Password Updated succesfully" });
	} catch (err){
        console.log(err);
		resp.status(500).send({ "error": "Some server error occured try after some time" });
	}
})

module.exports = router;