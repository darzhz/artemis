const express = require("express");
const path = require("path");
const router = express.Router();
const model = require("../model/model.js");
const utils = require("../utils/util.js");
router.use(express.json());
router.post("/add", async (req, res) => {
  const result = await model.createClass(req.body);
  res.send(result);
});
router.post("/addTimeTable", async (req, res) => {
  const result = await model.addTimetableEntry(req.body);
  res.send(result);
});
router.get("/getTimetableByFacultyId/:id", async (req, res) => {
  const result = await model.getTimetableByFacultyId(req.params.id);
  res.send(result);
});
router.get("/getTimetableByClassName/:name", async (req, res) => {
  const result = await model.getTimetableByClassName(
    req.params.name.toUpperCase()
  );
  res.send(result);
});
router.get("/getTimetableByDay/:day", async (req, res) => {
  const result = await model.getTimetableByDay(req.params.day);
  res.send(result);
});
router.get("/getFacultyFreeHours/:facultycode", async (req, res) => {
  /*
    i need to first get all the periods that is busy for a faculty
    {
        monday:[1,2],
        tuesday:[2],
        wednesday:[],
        thursday:[2,5],
        friday:[7]
    }
    then i just need to replace it with all all number in a day array with missing values from 1-7
    */
  const busyHours = await model.getBusyHoursForFaculty(req.params.facultycode);
  const freeHoursByDay = await utils.generateFreeHours(busyHours);
  res.send(freeHoursByDay);
});
router.post("/addAttendanceForMultipleUsers", async (req, res) => {
  const result = await model.addAttendanceForMultipleUsers(req.body.data);
  res.send(result);
});
module.exports = router;
