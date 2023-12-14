const express = require("express");
const path = require("path");
const router = express.Router();
const model = require("../model/model.js");
router.get('/type/:type', async (req,res) => { 
    const q = await model.searchByType(req.params.type);
    res.send(q);
});
module.exports = router;