const getMarks =  async(req)=>{
	try {
		var answers = await Formans.find({fId : req.body.fId});
		var id = answers.id;
		if(!answers){
			return {"error":"invalid form id"};
		}
		answers = answers.answer;
		var userAns = req.body.answer;
		var pointArr = [];
		var sum = 0;
		for(var i of answers){
			var res = userAns[i.queId];
			if(!res){
				return {"error":"Invalid response"};
			}
			var n = res.answer.length;
			var m = i.answer.length;
			if(n != m){
				return {"error":"Invalid response"};
			}
			var points = 0;
			for(var j = 0; j < n; j++){
				if(res.answer[j] == i.answer[j]) points += i.points[j];
				else if(isNaN(res.answer[j]) == false && isNaN(i.answer[j]) == false){
					if(parseInt(res.answer[j]) == 0);
					else {
						points = 0;
						i.wrong++;
						break;
					}
				}
			}
			if(points != 0) i.right++;
			if(i.decreasing){
				points = Math.max((i.maxTime/res.timeTaken) * points, Math.min(points, i.min));
			}
			var qId = i.queId;
			pointArr.push({qId : points});
			sum += points;
		}
		await Formans.findByIdAndUpdate(id, {
			$set : {
				answer : answers
			}
		});
		return {sum : sum, points : pointArr};
	}catch{
		return {error:"Server error"};
	}
}

module.exports = getMarks;