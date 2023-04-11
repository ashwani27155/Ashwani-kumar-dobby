const mongoose = require("mongoose");
const imageSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	date: {
		type: String,
		required: true,
	},
	image: {
		type: String,
	},
});
module.exports = mongoose.model("Images", imageSchema);
