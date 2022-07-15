const mongoose = require("mongoose");

const FormansModel = new mongoose.Schema({
	fId : {
        type : mongoose.Types.ObjectId, 
        required : true
    }, 
    answer :{
        type : [
            {
                answer : mongoose.Types.Array,
                points : mongoose.Types.Array,
                decreasing : {
                    type : Number,
                    default : 0
                },
                min : Number,
                queId : String,
                wrong : {
                    type:Number,
                    default : 0,
                },
                right:{
                    type:Number, 
                    default : 0
                }
            }
        ],
        default : []
    }
})

module.exports = mongoose.model("forms", FormansModel);