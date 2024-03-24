// Desc: Departments route
const express = require("express");
const path = require("path");
const router = express.Router();
const model = require("../model/model.js");
router.get('/getAllDepartments',async (req,res) =>{
        const result = await model.getAllDepartments();
        res.send(result);
    });
module.exports = router;