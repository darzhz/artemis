const ExcelJS = require('exceljs');
const path = require('path');
exports.generateFreeHours = async (busyHours) => {
  const allDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
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
exports.generateExcel = (data, req, res) => {
  const workbook = new ExcelJS.Workbook();

  const facultyName = 'B4:D4';
  const designation = 'F4:H4';
  const semester = 'J4';
  const courseCode = 'D3';
  const courseName = 'F3:H3';
  const year = 'J3';
  const className = 'L3';

  // Load an existing workbook
  workbook.xlsx.readFile(path.join(__dirname, 'example.xlsx'))
      .then(() => {
          // Access the first sheet
          const worksheet = workbook.getWorksheet(1);

          // Fill in specific cells with data
          worksheet.getCell(facultyName).value = data.faculty_code;
          worksheet.getCell(designation).value = 'Faculty Designation'; // Replace with actual designation
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
