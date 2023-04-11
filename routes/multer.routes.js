const express = require("express");
const userRouter = express.Router();
const Images = require("../model/imageUpload.model");
const multer = require("multer");
const path = require("path");
userRouter.use("/data", express.static("public"));

const storage = multer.diskStorage({
	destination: "./public",

	filename: function (req, file, cb) {
		cb(
			null,
			`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
		);
	},
});

const upload = multer({ storage: storage });
userRouter.post("/createimg", upload.single("image"), async (req, res) => {
	try {
		const image = await new Images({
			title: req.body.title,
			date: req.body.date,
			image: req.file.filename,
		});
		image.save();
		res.status(200).send({
			msg: "Image Uploaded successfully",
			image: image,
		});
	} catch (error) {
		console.log(error.message);
		res.status(404).send({
			msg: "something went wrong while uploading image",
		});
	}
});
userRouter.get("/getdata", async (req, res) => {
	try {
		const datafetched = await Images.find();

		res.status(200).send({
			ststus: true,
			msg: "Data fetched successfully",
			datafetched: datafetched,
		});
	} catch (error) {
		console.log(error.message);
	}
});
// userRouter.get("/search/", async (req, res) => {
// 	let result = await Images.findOne({ title: req.body.title });
// 	res.status(200).send({
// 		result: result,
// 	});
// });
userRouter.get("/search/:title", (req, res) => {
	const imageData = Images.findOne({ title: req.params.title })
		.then((data) => {
			console.log(data);
			res.status(200).send({
				msg: "Data Fetched Successfully",
				data: data,
			});
		})
		.catch((error) => {
			console.log(error.message);
			res.status(404).send({
				msg: "Something Went Wrong",
			});
		});
});

module.exports = userRouter;
