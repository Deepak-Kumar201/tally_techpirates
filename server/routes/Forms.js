const express = require("express");
const getMarks = require("../middleware/getMarks");
const resolveJWT = require("../middleware/resolveJWT");
const Formans = require("../models/Formans");
const Formresp = require("../models/Formresp");
const Forms = require("../models/Forms");
const User = require("../models/User");
const router = express.Router();

router.post('/create', resolveJWT, async (req, resp) => {
	try {

		const data = {
			title : req.body.title,
			description : req.body.description,
			data: JSON.stringify(req.body.data),
			user: req.body.id,
		}

        if(data.title.trim() == "") {
            resp.status(400).send("Invalid form title");
            return;
        }

        if(data.description.trim() == "") {
            resp.status(400).send("Invalid form description");
            return;
        }
		if(User.count({_id:req.body.id}) == 0){
			resp.send({error:"User auth failed"});
			return;
		}
        if(req.body.time) data.time = req.body.time;
        if(req.body.timeToAttempt) data.timeToAttempt = req.body.timeToAttempt;
        var newForm = new Forms(data);
        await newForm.save();

		await User.findByIdAndUpdate(req.body.id, {
            $push :{
                forms : newForm.id
            }
        })

        var formans = new Formans({
            fId : newForm.id,
            answer : req.body.answer
        })

        await formans.save();

        var formresp = new Formresp({
            fId : newForm.id
        });

        await formresp.save();

		resp.send({ "fId": newForm.id });

	} catch (error){
		console.log(error);
		resp.status(500).send({ "error": "Some server error occured try after some time" });
	}
})

router.post("/getForm", async (req, resp) => {
	try {
		const data = await Forms.findById(req.body.fId);

		if (data == null) {
			resp.status(400).send({ "error": "Quiz not found please check ID" });
			return;
		}
		
        // checking time valid
        var time = data.time, timeValid = false;
        if(time[0] == -1) timeValid = true;
        else if(time[0] < Date.now() && time[1] > Date.now()) timeValid = true;
        
        if(timeValid == false || data.accepting == false){
            resp.status(400).send({"error" : "Quiz is not accepting respone now"});
            return;
        }

		//checking filledForms 
		var filled = req.body.filled;
		if(!filled) filled = [];
		if(filled.indexOf(data.id) != -1){
			resp.status(400).send({"error":"You have already filled Quiz"});
			return;
		}
        
		resp.send(data);
	} catch (err){
		console.log(err);
		resp.status(500).send({ "error": "Server error occured" });
	}
})

router.put("/fill", async (req, resp) => {
	try {
		const data = await Forms.findById(req.body.fId);
        // checking time valid
		if(!data){
			resp.status(404).send({error:"Quiz Not Found"});
			return;
		}
        var time = data.time, timeValid = false;
        if(time[0] == -1) timeValid = true;
        else if(time[0] < Date.now() && time[1] > Date.now()) timeValid = true;
        
        if(timeValid == false || data.accepting == false){
            resp.status(400).send({"error" : "Quiz is not accepting respone now"});
            return;
        }

		//checking filledForms 
		var filled = req.body.filled;
		if(!filled) filled = [];
		if(filled.indexOf(data.id) != -1){
			resp.status(400).send({"error":"You have already filled Quiz"});
			return;
		}

		var getM = await getMarks(req);
		if(getM.error){
			resp.status(400).send(getM);
			return;
		}

		var toAdd = {
			resp : req.body.answer,
			name : req.body.name,
			marks : getM
		};

		toAdd = JSON.stringify(toAdd);

		await Formresp.findOneAndUpdate({fId:req.body.fId}, {
			$push : {
				responses : toAdd
			}
		});
		console.log(filled, getM);
		filled.push(req.body.fId);
		resp.cookie('filled', filled, {httpOnly:true}).send({"success":"You responded successfully", filled: filled, score : getM.sum});
		
	} catch (err){
		console.log(err);
		resp.status(500).send({ "error": "Some server error occured try after some time" });
	}
})

router.post("/changeactive", resolveJWT, async(req, resp)=>{
	try {
		var x = await Forms.updateOne({_id : req.body.fid, user : req.body.id}, {
			$set:{
				time : req.body.time
			}
		});
		if(x.acknowledged == false){
			resp.status(400).send({"error":"Cann't modify Quiz option"});
		}
		console.log(x);
		resp.status(200).send({success:"Time Updated"});
	} catch (error) {
		resp.status(500).send({ "error": "Some server error occured try after some time" });
	}
})

router.post("/getanswer", resolveJWT,async (req, resp)=>{
	try {
		var form = await Forms.findOne({_id : req.body.fId, user : req.body.id});
		if(!form){
			resp.status(401).send({error:"Cann't get Quiz"});
			return;
		}
		var answers = await Formans.findOne({fId : req.body.fId});
		
		if(!answers){
			return {"error":"invalid form id"};
		}
		resp.send({data:answers});
	} catch (error) {
		resp.status(500).send({ "error": "Some server error occured try after some time" });
	}
});

router.post("/getresponse", resolveJWT,async (req, resp)=>{
	try {
		var form = await Forms.findOne({_id : req.body.fId, user : req.body.id});
		if(!form){
			resp.status(401).send({error:"Cann't get Quiz"});
			return;
		}
		var answers = await Formresp.findOne({fId : req.body.fId});
		
		if(!answers){
			return {"error":"invalid form id"};
		}
		resp.send({data:answers});
	} catch (error) {
		resp.status(500).send({ "error": "Some server error occured try after some time" });
	}
});

router.post("/getauthform", resolveJWT,async (req, resp)=>{
	try {
		var form = await Forms.findOne({_id : req.body.fId, user : req.body.id});
		if(!form){
			resp.status(401).send({error:"Cann't get Quiz"});
			return;
		}
		resp.send({data:form});
	} catch (error) {
		resp.status(500).send({ "error": "Some server error occured try after some time" });
	}
});

router.post('/updateRecieve', resolveJWT,async (req, resp)=>{
	try {
		var x = await Forms.updateOne({_id : req.body.fId, user : req.body.id}, {
			$set:{
				accepting : req.body.accepting
			}
		});
		if(x.acknowledged == false){
			resp.status(400).send({"error":"Cann't modify Quiz option"});
		}
		console.log(x);
		resp.status(200).send({success:"Time Updated"});
	} catch (error) {
		resp.status(500).send({ "error": "Some server error occured try after some time" });
	}
})

module.exports = router;