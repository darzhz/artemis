const express = require("express");
const path = require("path");
const router = express.Router();
const model = require("../model/model.js");
router.get('/type/:type', async (req,res) => { 
    const q = await model.searchByType(req.params.type);
    res.send(q);
});
router.use(express.json());
router.post('/add', async (req,res) => {
    const result = await model.insertSubject(req.body);
    res.send(result);
})
router.post('/addToClass', async (req,res) => {
    const result = await model.addSubjectsToClass(req.body);
    res.send(result);
})
router.get('/getsubfcode/:code',async (req,res) =>{
    const result = await model.getSubjectsByFacultyCode(req.params.code);
    res.send(result);
})
module.exports = router;