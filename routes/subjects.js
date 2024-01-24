const express = require("express");
const path = require("path");
const router = express.Router();
const model = require("../model/model.js");
const util = require("./../utils/util.js")
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
router.get('/generate',(req,res)=> {
    const data = {
        "sub_code": "IT456",
        "sub_name": "Internet of Things (IoT)",
        "faculty_code": "PC1234",
        "deptid": 23,
        "subinfo": [
          {
            "module": "Module 1: 10T Architecture (10 Hours)",
            "subunits": [
              {
                "subunit": "What is IoT",
                "hours_allotted": 1,
                "date_commencement": "2024-02-06",
                "date_completion": "2024-02-07"
              },
              {
                "subunit": "Genesis of IoT",
                "hours_allotted": 1,
                "date_commencement": "2024-02-08",
                "date_completion": "2024-02-09"
              },
              {
                "subunit": "IoT and Digitization",
                "hours_allotted": 1,
                "date_commencement": "2024-02-10",
                "date_completion": "2024-02-11"
              },
              {
                "subunit": "IoT Impact",
                "hours_allotted": 1,
                "date_commencement": "2024-02-12",
                "date_completion": "2024-02-13"
              },
              {
                "subunit": "Convergence of IT and IoT",
                "hours_allotted": 1,
                "date_commencement": "2024-02-14",
                "date_completion": "2024-02-15"
              },
              {
                "subunit": "IoT Challenges",
                "hours_allotted": 1,
                "date_commencement": "2024-02-16",
                "date_completion": "2024-02-17"
              },
              {
                "subunit": "IT Network Architecture and Design",
                "hours_allotted": 1,
                "date_commencement": "2024-02-18",
                "date_completion": "2024-02-19"
              },
              {
                "subunit": "Drivers Behind New Network Architectures",
                "hours_allotted": 1,
                "date_commencement": "2024-02-20",
                "date_completion": "2024-02-21"
              },
              {
                "subunit": "Comparing IoT Architectures",
                "hours_allotted": 1,
                "date_commencement": "2024-02-22",
                "date_completion": "2024-02-23"
              },
              {
                "subunit": "A Simplified IoT Architecture",
                "hours_allotted": 1,
                "date_commencement": "2024-02-24",
                "date_completion": "2024-02-25"
              },
              {
                "subunit": "The Core IoT Functional Stack",
                "hours_allotted": 1,
                "date_commencement": "2024-02-26",
                "date_completion": "2024-02-27"
              },
              {
                "subunit": "IoT Data Management and Compute Stack",
                "hours_allotted": 1,
                "date_commencement": "2024-02-28",
                "date_completion": "2024-02-29"
              }
            ]
          }, {
            "module": "Module 2: Engineering IT Networks for the IoT Era (8 Hours)",
            "subunits": [
              {
                "subunit": "Smart Objects: The “Things” in IoT",
                "hours_allotted": 1,
                "date_commencement": "2024-03-06",
                "date_completion": "2024-03-07"
              },
              {
                "subunit": "Sensors, Actuators, and Smart Objects",
                "hours_allotted": 1,
                "date_commencement": "2024-03-08",
                "date_completion": "2024-03-09"
              },
              {
                "subunit": "Sensor Networks, Connecting Smart Objects",
                "hours_allotted": 1,
                "date_commencement": "2024-03-10",
                "date_completion": "2024-03-11"
              },
              {
                "subunit": "Communications Criteria, [oT Access Technologies",
                "hours_allotted": 1,
                "date_commencement": "2024-03-12",
                "date_completion": "2024-03-13"
              },
              {
                "subunit": "Building Resilient Arteries: Design and Management Strategies for Robust IT Networks in IoT Applications",
                "hours_allotted": 1,
                "date_commencement": "2024-03-14",
                "date_completion": "2024-03-15"
              },
              {
                "subunit": "Another Subunit for Module 2",
                "hours_allotted": 1,
                "date_commencement": "2024-03-16",
                "date_completion": "2024-03-17"
              },
              {
                "subunit": "Yet Another Subunit for Module 2",
                "hours_allotted": 1,
                "date_commencement": "2024-03-18",
                "date_completion": "2024-03-19"
              },
              {
                "subunit": "Final Subunit for Module 2",
                "hours_allotted": 1,
                "date_commencement": "2024-03-20",
                "date_completion": "2024-03-21"
              }
            ]
          },
          // ... (the rest of the JSON remains unchanged)
        ]
      }
      
    util.generateExcel(data,req,res);
})
module.exports = router;