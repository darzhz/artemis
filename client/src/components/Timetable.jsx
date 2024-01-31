import React, { useEffect, useState } from "react";
import "./styles/header.css";
export default function Timetable() {
  let weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [subQueue, setSubQueue] = useState([]);
  const [selected, setSelected] = useState("N/Aw");
  const [freeHoursData, setFreeHoursData] = useState({});
  const initialArray = Array(7)
    .fill(null)
    .map(() => Array(weekDays.length + 1).fill(null));
  const [subjects, setSubjects] = useState(initialArray);
  const isNull = (item) => {
    return item == null ? "N/A" : item;
  };
  const handleSelection = (e) => {
    const item = e.target.getAttribute("item");
    fetchFreeHours();
    console.log(item);
    setSelected(item);
  };
  const handleReset = () => {
    setSubjects(initialArray);
  };
  const save = () => {
    console.log(convertTimetableToJson(subjects))
  }
  const handleClick = (e) => {
    const row = e.target.getAttribute("row");
    const col = e.target.getAttribute("col");
    console.log(
      `Selected ${weekDays[row]} : period ${col} active Selection: ${selected}`
    );
    const newSubjects = subjects.map((rowArray, rowIndex) =>
      row === rowIndex.toString()
        ? rowArray.map((subject, colIndex) =>
            col === colIndex.toString() ? selected : subject
          )
        : rowArray
    );
    // Update the state with the new array
    console.log(newSubjects);
    setSubjects(newSubjects);
  };
  const [subjectlist, setSubjectlist] = useState([
    {
      sub_code: "CS202",
      sub_name: "intro to crypto scams",
      faculty_code: "53",
      deptid: 1,
      subinfo: {
        module1: "basics of computing",
        module2: "introduction to wafferscience",
      },
    },
    {
      sub_code: "CS201",
      sub_name: "intro to phishing",
      faculty_code: "53",
      deptid: 1,
      subinfo: {
        module1: "basics of computing",
        module2: "introduction to wafferscience",
      },
    },
  ]);
  //FIXME ABSTRACT THE FUNCTION TO PARENT COMPONENT
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
  // done

  const convertTimetableToJson = (initialArray) => {
    const weekDays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const jsonResult = [];

    initialArray.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell) {
          const [subCode, faculty_id] = cell.split(" ");
          const day = weekDays[colIndex];
          const period = rowIndex + 1;

          jsonResult.push({
            timetable_id: jsonResult.length + 1,
            day,
            period,
            class_name: "cs01",
            faculty_id: parseInt(faculty_id),
            dept_name: "CSE",
            sub_code: subCode,
          });
        }
      });
    });

    return jsonResult;
  };
  const [selectedItem, setSelectedItem] = useState("");
  const handleSelectChange = (e) => {
    const selectedValue =
      e.target.value + " " + e.target[e.target.selectedIndex].dataset.attribute;
    console.log(e.target[e.target.selectedIndex].dataset.attribute);
    setSelectedItem(selectedValue);
  };
  const fetchFreeHours = async () => {
    try {
      const selectedFaculty = parseInt(selected.split(" ")[1]);
      if (isNaN(selectedFaculty)) {
        return;
      }
      const response = await fetch(
        `/api/class/getFacultyFreeHours/${selectedFaculty}`
      );
      const data = await response.json();
      setFreeHoursData(data);
    } catch (error) {
      console.error("Error fetching free hours data:", error);
    }
  };
  const fetchData = async () => {
    try {
      const response = await fetch("/api/class/getSubjectsByClassname/cse01");
      const data = await response.json();
      console.log(data.subjects[0].subjects);
      return data.subjects[0].subjects || [];
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const addSubject = () => {
    setSubQueue((prevQueue) => [...new Set([selectedItem, ...prevQueue])]);
  };
  const isFreeHour = (row, col) => {
    const allDays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const day = allDays[row];
    const hour = col + 1;
    return freeHoursData[day] && freeHoursData[day].includes(hour);
  };
  useEffect(() => {
    const update = async () => {
      let data = await fetchData();
      setSubjectlist(data);
      console.log(subjectlist);
    };
    update();
  }, []);
  return (
    <div className="grid h-screen grid-cols-[250px_1fr] gap-4">
      <div className="p-4 border-r overflow-auto">
        <h2 className="text-lg font-semibold">Subjects</h2>
        <p className="day">Currently Selected : {selected || "N/A"}</p>
        <div className="flex justify-between items-center mb-4">
          <select
            id="sub_code"
            name="sub_code"
            className="w-full p-2 border rounded-md"
            onChange={handleSelectChange}
          >
            <option>select any subject</option>
            {subjectlist.map((subject, index) => (
              <option
                key={index}
                value={subject.sub_code}
                data-attribute={subject.faculty_code}
              >
                <div key={index}>
                  <p>
                    {subject.sub_code} - {subject.faculty_code}
                  </p>
                  {/* Iterate over subjectinfo properties */}
                  {Object.entries(subject.subinfo).map(([key, value]) => (
                    <p key={key} />
                  ))}
                </div>
              </option>
            ))}
          </select>
          <button
            className="bg-green-500 text-gray-100 btn h-8"
            onClick={addSubject}
          >
            + Sub
          </button>
        </div>

        <div className="grid gap-4">
          {subQueue.map((item, i) => (
            <div
              className={`p-4 border rounded-md cursor-move subject${i}`}
              item={item}
              key={i}
              onClick={handleSelection}
            >
              subject-{item}
            </div>
          ))}
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Timetable</h2>
        <div className="grid grid-cols-7 gap-2">
          {[1, 2, 3, 4, 5, 6, 7].map((hour, hourIndex) => (
            <div className="col-span-1" key={hourIndex}>{` Hr ${hour}`}</div>
          ))}
          {weekDays.map((item, i) => (
            <>
              {subjects.map((subs, subIndex) => (
                <div
                  row={i}
                  col={subIndex}
                  className={`col-span-1 border rounded-md Box TBox subject${subQueue.indexOf(
                    subjects[i][subIndex]
                  )} ${isFreeHour(i, subIndex) ? "free-hour" : ""}`}
                  key={subIndex}
                  onClick={handleClick}
                >
                  <sub row={i} col={subIndex} id="subIndex">
                    {item}
                  </sub>
                  <span
                    row={i}
                    col={subIndex}
                    id="subIndex"
                    className="day"
                    rendered={subs[i]}
                  >
                    {isNull(subjects[i][subIndex])}
                  </span>
                </div>
              ))}
            </>
          ))}
        </div>
        <div className="control">
          <button className="btn btn-outline btn-accent" onClick={save}>save</button>
          <button className="btn btn-outline btn-warning" onClick={handleReset}>
            reset
          </button>
          <button className="btn btn-outline btn-info">
            Generate Timetable
          </button>
        </div>
      </div>
    </div>
  );
}
