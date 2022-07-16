const mongoose = require("mongoose");

const FormrespModel = new mongoose.Schema({
	fId : {
        type : mongoose.Types.ObjectId, 
        required : true
    }, 
    responses :{
        type : mongoose.Schema.Types.Array,
        default : []
    }
})

module.exports = mongoose.model("formsresp", FormrespModel);