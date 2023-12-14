const express = require("express");
const multer = require('multer');
const path = require("path");
const router = express.Router();
const model = require("../model/model.js")
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'users/'); // Files will be uploaded to the 'uploads' directory
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
  });
const upload = multer({ storage });
router.post("/",upload.single('profilePic'),async (req, res, next) => {
    const { username, email, type, password } = req.body;
    const profilePic = req.file;
    console.log(req.body);
    const result  = await model.RegisterNewUser(username,type,email);
    if (result.success) {
      res.status(201).json({ message: 'Registration successful' });
      console.log(result.message);
      console.log('New User:', result.user);
  } else {
      console.error(result.message);
  }
  });
  module.exports = router;