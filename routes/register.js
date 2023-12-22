const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const model = require("../model/model.js");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "users/"); // Files will be uploaded to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
router.use(express.json());
const upload = multer({ storage });
router.post("/", upload.single("profilePic"), async (req, res, next) => {
  const profilePic = req.file;
    const userData = req.body;
    console.log(userData);
    const result  = await model.RegisterNewUser(userData);
    if (result.success) {
      res.status(201).json({ message: result.message});
      console.log(result.message);
      console.log('New User:', result.user);
  } else {
      console.error(result.message);
  }
});
module.exports = router;
