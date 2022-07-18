const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const resolveJWT = require("../middleware/resolveJWT");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');

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
            resp.status(400).send({ "error": "First name must be more than 2 chars long" });
            return;
        }

        if(password.trim().length < 8){
            resp.status(400).send({ "error": "Password must be more than 7 chars long" });
            return;
        }

        var  oldData = await User.findOne({ email: req.body.email });
        if (oldData != null) {
            resp.send({ "error": "Email ID is already registered. Please try another Email ID" });
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
		}, process.env.JWT_SECRET);
        // resp.cookie("token", jwtTokken, {httpOnly:true});
        resp.send({ "token": jwtTokken});

	} catch (err){
        // console.log(err)
		resp.status(500).send({ "error": "Server error occured. Try after some time" });
	}

});

router.post("/signin", async (req, resp) => {
	try {
		const oldData = await User.findOne({ email: req.body.email});

		if (oldData == null) {
			resp.status(404).send({ "error": "Email ID not registered" });
			return;
		}
        if(await bcrypt.compare(req.body.password, oldData.password) === false){
            resp.status(401).send({"error":"User details invalid"})
            return;
        }

		var jwtTokken = jwt.sign({
			id: oldData.id
		}, process.env.JWT_SECRET);

		resp.send({ "token": jwtTokken});
	} catch (err){
        // console.log(err);
		resp.status(500).send({ "error": "Server error occured. Try after some time" });
	}
});

router.post('/auth' , resolveJWT, async (req , res)=>{
    try {
        const userData = await User.findById(req.body.id).populate("forms");
        if(!userData){
            res.status(404).send({error:"User not found"});
            return;
        }
        userData.password = "";
        res.send({"user": userData});
    } catch (error) {
		res.status(500).send({ "error": "Server error occured. Try after some time" });
    }
})

router.put("/updatePassword", async(req, resp)=>{
    try {
		const oldData = await User.findOne({email : req.body.email});

        if (oldData == null) {
			resp.status(404).send({ "error": "Email ID not registered" });
			return;
		}
        if(!oldData.otp || oldData.otp != req.body.otp){
            resp.status(401).send({error:"Incorrect OTP"});
            return;
        }

        password = await bcrypt.hash(req.body.newPassword, 10);

        await User.findByIdAndUpdate(oldData.id, {
            $set : {
                password : password,
                otp:0
            }
        });

		resp.send({ "success": "Password updated successfully" });
	} catch (err){
        // console.log(err);
		resp.status(500).send({ "error": "Server error occured. Try after some time" });
	}
})


router.post("/requestOTP", async(req, resp)=>{
    try {
        var user = await User.findOne({email:req.body.email})
        if(!user){
            resp.status(400).send({error:"Email ID not registered"});
            return;
        }
        let transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              user: process.env.EMAIL_USERNAME,
              pass: process.env.EMAIL_PASSWORD
            }
        });

        var otp = Math.floor(100000 + Math.random() * 900000);

        const mailOptions = {
            from: 'tallycode40@gmail.com', // Sender address
            to: req.body.email,
            subject: 'Otp request for password change', // Subject line
            text: 'Your requested OTP for password change is ' + otp, 
        };
       
        var x = await transport.sendMail(mailOptions);
        
        if(x.error){
            resp.status(500).send({"error": "Server error occured. Try after some time" })
        }else{
            await User.findByIdAndUpdate(user.id, {
                $set:{
                    otp : otp
                }
            })
            resp.status(200).send({success:"OTP sent to Email ID"});
        }

    } catch (error) {
        // console.log(error)
        resp.status(500).send({"error": "Server error occured. Try after some time" })
    }
})


module.exports = router;