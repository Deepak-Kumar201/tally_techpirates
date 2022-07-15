const mongoose = require("mongoose");

const FormModel = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	data: {
		type: String,
		required: true
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
    time: {
        type:[mongoose.Schema.Types.Date, mongoose.Schema.Types.Date],
        default : [-1, -1]
    },
    timeToAttempt : {
        type : Number,
        default : -1
    }
})

module.exports = mongoose.model("forms", FormModel);