const express = require("express");
const path = require("path");
const router = express.Router();
const model = require("../model/model.js");
router.use(express.json());


router.get('/getExamByStatus/:status',async (req,res) =>{
    const result = await model.getExamsByStatus(parseInt(req.params.status));
    res.send(result);
});

//unfinished 
router.get('/getExamByDept/:dept',async (req,res) =>{
    const result = await model.getExamByDept(req.params.dept);
    res.send(result);
});
router.get('/getExamByClass/:Classname',async (req,res) =>{
    const result = await model.getExamByClass(req.params.Classname);
    res.send(result);
});
router.post('/addExam', async (req,res) => {
    const result = await model.addExam(req.body);
    res.send(result);
});
router.post('/addExamToClass', async (req,res) => {
    const result = await model.addExamToClass(req.body);
    res.send(result);
});
router.post('/addMarks', async (req,res) => {
    const result = await model.addMarks(req.body);
    res.send(result);
});
router.get('/getMarksByDept/:dept',async (req,res) =>{
    const result = await model.getMarksByDept(req.params.dept);
    res.send(result);
});
router.get('/getMarksByClass/:Classname',async (req,res) =>{
    const result = await model.getMarksByClass(req.params.Classname);
    res.send(result);
});
module.exports = router;