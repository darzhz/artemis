const express = require("express");
const multer = require('multer');
const path = require("path");
const router = express.Router();
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
    const { username, email, password } = req.body;
    const profilePic = req.file;
    console.log(req.body);
    res.status(201).json({ message: 'Registration successful' });
  });
  module.exports = router;