const ExcelJS = require('exceljs');
const path = require('path');
const model = require('../model/model')
exports.generateFreeHours = async (busyHours) => {
  const allDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"];
  const allHours = [1, 2, 3, 4, 5, 6, 7];
  const freeHoursByDay = {};

  // Initialize free hours for all days
  allDays.forEach((day) => {
    freeHoursByDay[day] = [...allHours];
  });

  // Update free hours based on busy hours
  for (const day of Object.keys(busyHours)) {
    const busyHoursOfDay = busyHours[day];
    freeHoursByDay[day] = allHours.filter(
      (hour) => !busyHoursOfDay.includes(hour)
    );
  }

  return freeHoursByDay;
};
exports.generateExcel = async (data, req, res) => {
  const workbook = new ExcelJS.Workbook();
  console.log('generating lessonplan');
  const facultyName = 'B4:D4';
  const designation = 'F4:H4';
  const semester = 'J4';
  const courseCode = 'D3';
  const courseName = 'F3:H3';
  const year = 'J3';
  const className = 'L3';
  const facultyResp = await model.getFacultyByFacultyCode(data.faculty_code)
  if(!facultyResp.success){
    console.error(facultyResp.message);
    res.status(500).send('Internal Server Error');
    return;
  }
  // Load an existing workbook

  workbook.xlsx.readFile(path.join(__dirname, 'example.xlsx'))
      .then(() => {
          // Access the first sheet
          const worksheet = workbook.getWorksheet(1);

          // Fill in specific cells with data
          console.log(facultyResp.faculty.role)
          worksheet.getCell(facultyName).value = facultyResp.faculty.facultyName;
          worksheet.getCell(designation).value = facultyResp.faculty.role; // Replace with actual designation
          worksheet.getCell(semester).value = 'Semester'; // Replace with actual semester
          worksheet.getCell(courseCode).value = data.sub_code;
          worksheet.getCell(courseName).value = data.sub_name;
          worksheet.getCell(year).value = 'Year'; // Replace with actual year
          worksheet.getCell(className).value = 'Class'; // Replace with actual class name

          // Iterate through subinfo data
          let row = 6;
          let index = 1.0;
          // const isMerged = worksheet.getCell(`A${row}:A${row + module.subunits.length - 1}`).isMerged;
          //       if (!isMerged) {
          //           // Merge cells in column A for each module
          //           worksheet.mergeCells(`A${row}:A${row + module.subunits.length - 1}`);
          //       }
          data.subinfo.forEach((module,moduleIndex) => {
             worksheet.mergeCells(`A${row}:A${row + module.subunits.length - 1}`);
              worksheet.getCell(`A${row}`).value = moduleIndex + 1;
              module.subunits.forEach((subunit,subunitIndex) => {
               // worksheet.mergeCells(`C${row}:I${row}`);
                const isCellMerged  = worksheet.getCell(`C${row}:I${row}`).isMerged;
                if(!isCellMerged){ worksheet.mergeCells(`C${row}:I${row}`); }
                worksheet.getCell(`C${row}:I${row}`).alignment = { horizontal: 'center', vertical: 'middle' };
                worksheet.getCell(`B${row}`).value = subunitIndex;
                  worksheet.getCell(`C${row}`).value = subunit.subunit;
                  worksheet.getCell(`J${row}`).value = subunit.hours_allotted;
                  worksheet.getCell(`K${row}`).value = subunit.date_commencement;
                  worksheet.getCell(`L${row}`).value = subunit.date_completion;
                  row++;
              });
          });

          // Set the content type and headers for the response
          res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
          res.setHeader('Content-Disposition', 'attachment; filename=updated-example.xlsx');

          // Pipe the workbook directly to the response
          return workbook.xlsx.write(res);
      })
      .then(() => {
          console.log('Excel file updated successfully and sent for download.');
      })
      .catch((error) => {
          console.error('Error:', error.message);
          res.status(500).send('Internal Server Error');
      });
};
exports.generateTimetableExcel = async(data,req,res) => {
  const workbook = new ExcelJS.Workbook();
  console.log('generating Timetable');
  const courseCode = 'D3';
  const courseName = 'F3:H3';
  const year = 'J3';
  const className = 'L3';
  const facultyName = 'B4:D4';
  const designation = 'F4:H4';
  const semester = 'J4';
  const Timedata = [
    [
        "mecon 63",
        "mecon 63",
        "mecon 63",
        "mecon 63",
        "CS201 53",
        "CS201 53",
        "mecon 63"
    ],
    [
        "mecon 63",
        "CS202 53",
        "CS202 53",
        "CS202 53",
        "CS202 53",
        "CS201 53",
        "mecon 63"
    ],
    [
        "mecon 63",
        "CS201 53",
        "CS202 53",
        "CS202 53",
        "CS202 53",
        "CS201 53",
        "CS201 53"
    ],
    [
        "mecon 63",
        "CS201 53",
        "mecon 63",
        "mecon 63",
        "mecon 63",
        "CS201 53",
        "CS202 53"
    ],
    [
        "mecon 63",
        "CS201 53",
        "CS202 53",
        "CS202 53",
        "CS202 53",
        "CS201 53",
        "CS202 53"
    ],
    [
        "CS201 53",
        "CS202 53",
        "CS202 53",
        "CS201 53",
        "CS202 53",
        "CS202 53",
        "CS202 53"
    ]
]
  workbook.xlsx.readFile(path.join(__dirname, 'time.xlsx'))
      .then(() => {
        const worksheet = workbook.getWorksheet(1);
          worksheet.getCell(facultyName).value = 'random';
          worksheet.getCell(designation).value = 'designation'; 
          worksheet.getCell(semester).value = 'Semester'; 
          worksheet.getCell(courseCode).value = 'code_123';
          worksheet.getCell(courseName).value = 'juggling';
          worksheet.getCell(year).value = '2002'; 
          worksheet.getCell(className).value = 'super'; 
          //time table starts with c8 and ends at j8 while skiping  all H
          let timetableRow = 8;
          let timetableColumn = 3;
    
          Timedata.forEach((row) => {
            row.forEach((cell) => {
              // Skip column H
              if (timetableColumn !== 8) {
                worksheet.getCell(`${getExcelLetter(timetableColumn)}${timetableRow}`).value = cell;
              }else{
                worksheet.getCell(`${getExcelLetter(timetableColumn+1)}${timetableRow}`).value = cell;
                timetableColumn++;
              }
              timetableColumn++;
            });
            timetableColumn = 3; // Reset column for the next row
            timetableRow++;
          });
          //last row starts at c13 and ends at j13 while skiping  all H
          res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
          res.setHeader('Content-Disposition', 'attachment; filename=updated-time.xlsx');

          // Pipe the workbook directly to the response
          return workbook.xlsx.write(res);
      })
      .then(() => {
          console.log('Excel file updated successfully and sent for download.');
      })
      .catch((error) => {
          console.error('Error:', error.message);
          res.status(500).send('Internal Server Error');
      });
}
function getExcelLetter(columnIndex) {
  let letter = '';
  while (columnIndex > 0) {
    const remainder = (columnIndex - 1) % 26;
    letter = String.fromCharCode('A'.charCodeAt(0) + remainder) + letter;
    columnIndex = Math.floor((columnIndex - 1) / 26);
  }
  return letter;
}
const convertJsonToTimetable = (input) => {
  let weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let initialArray = Array(7)
    .fill(null)
    .map(() => Array(weekDays.length + 1).fill(null));
  input.forEach((item) => {
    const row = item.period - 1;
    const col = weekDays.indexOf(item.day);
    initialArray[row][col] = item.class_name + " " + item.faculty_id;
    initialArray[row][col] = item.sub_code + " " + item.faculty_id;
  });
  console.log(initialArray);
};