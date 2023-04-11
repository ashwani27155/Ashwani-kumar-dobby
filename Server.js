const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRute = require("./routes/user.routes");
const imageUploaded = require("./routes/multer.routes");
const bodyparser = require("body-parser");
const cors = require("cors");
const db =
	"mongodb+srv://abicashwani:B1tjvN3a1cewwCuw@cluster0.pynjlmq.mongodb.net/crudapp=true&w=majority";
const PORT = process.env.PORT || 8000;
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyparser.json());
mongoose
	.connect(db)
	.then(() => {
		console.log("MongoDB connected successfully");
	})
	.catch((error) => {
		console.log(
			"Something went wrong while connecting to database",
			error.message
		);
	});
app.use("/user", userRute);
app.use("/image", imageUploaded);
if (process.env.NODE_ENV == "production") {
	app.use(express.static("my-app/build"));
}
app.listen(PORT, () => {
	console.log("Server is running on port");
});
