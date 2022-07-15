const mongoose = require("mongoose");

const FormrespModel = new mongoose.Schema({
	fId : {
        type : mongoose.Types.ObjectId, 
        required : true
    }, 
    responses :{
        type : [
            {
                name : String,
                resp : String,
                marks : {
                    type : {
                        sum : Number,
                        points : mongoose.Types.Array
                    }
                }
            }
        ],
        default : []
    }
})

module.exports = mongoose.model("forms", FormrespModel);