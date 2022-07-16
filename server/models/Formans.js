const mongoose = require("mongoose");

const FormansModel = new mongoose.Schema({
	fId : {
        type : mongoose.Schema.Types.ObjectId, 
        required : true
    }, 
    answer :{
        type : mongoose.Schema.Types.Array,
        default : []
    }
})

module.exports = mongoose.model("formsans", FormansModel);