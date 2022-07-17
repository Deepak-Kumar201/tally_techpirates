const Formans = require("../models/Formans");

const getMarks =  async(req)=>{
	try {
		var answers = await Formans.findOne({fId : req.body.fId});
		var id = answers.id;
		if(!answers){
			return {"error":"invalid form id"};
		}
		// console.log(answers);
		answers = JSON.parse(answers.answer[0]);

		var userAns = req.body.answer;
		console.log(userAns);
		var pointArr = [];
		var sum = 0;

		for(var i of answers){
			var queId = i.queId;
			var userResp = userAns[queId].ans;
			console.log(userResp, i);
			if(userResp.length == 0) {
				pointArr.push(0);
				i.wrong++;	
				continue;
			}

			var n = i.ans.length;
			var point = 0;
			console.log("resposes ",i.ans, userResp);
			for(var j = 0; j < n; j++){
				if(i.ans[j] === userResp[j])  {
					console.log(i.ans[j], userResp[j]);
					point+=i.points[j];
				}else if(i.ans[j] == true && userResp[j] == false);
				else {
					// console.log(i.ans[j], userResp[j]);
					point = 0;
					i.wrong++;
					break;
				}
			}
			
			if(point == 0) pointArr.push(0);
			else{
				i.right++;
				if(i.decreasing){
					var time = Math.max(0,(point - i.minScore));
					time = parseFloat(((i.time - userAns[queId].time)/i.time) * time) + parseInt(i.minScore);
					pointArr.push(time);
					sum += time;
				}else{
					pointArr.push(point); sum += point;
				}
			}
		}


		
		await Formans.findByIdAndUpdate(id, {
			$set : {
				answer : JSON.stringify(answers)
			}
		});
		var sc = {sum : sum, points : pointArr};
		console.log(sc);
		return {sum : sum, points : pointArr};
	}catch(error){
		console.log(error);
		return {error:"Server error"};
	}
}

module.exports = getMarks;