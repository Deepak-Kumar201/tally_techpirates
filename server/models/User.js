const mongoose = require("mongoose");

const UserModel = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	forms: {
		type: [
            mongoose.Types.ObjectId
        ],
        default : [],
		ref : 'forms'
	},
	otp :{
		type : Number, 
		default:0
	}
})

module.exports = mongoose.model("user", UserModel);