const express = require("express");
const path = require("path");
const router = express.Router();
const model = require("../model/model.js");
router.use(express.json());

router.get('/getdept/:dept',async (req,res) =>{
    const result = await model.getStudentsByDept(req.params.dept);
    res.send(result);
})
router.get('/getStudentsByClass/:Classname',async (req,res) =>{
    const result = await model.getStudentsByClass(req.params.Classname);
    res.send(result);
})
router.post('/addToClass', async (req,res) => {
    const result = await model.addStudentsToClass(req.body);
    res.send(result);
})
module.exports = router;