import React from "react";
import { useState,useEffect } from "react";

const HourComponent = ({ active, activeHour, setActiveHour }) => {
    const [timetable, setTimetable] = useState([]);
  
    const fetchTimetableData = async () => {
      try {
        const response = await fetch(`/api/class/getTimetableByFacultyId/53`);
        const data = await response.json();
        setTimetable(data || []);
      } catch (error) {
        console.error("Error fetching timetable data:", error);
      }
    };
  
    const handleHourChange = (e) => {
      // Extract attributes from the clicked element
      const class_name = e.currentTarget.getAttribute("clsname");
      const period = e.currentTarget.getAttribute("period");
      const subcode = e.currentTarget.getAttribute("subcode");
      setActiveHour({
        class_name: String(class_name),
        period: String(period),
        subcode: String(subcode),
      });
    };
  
    const convertDateToDay = (dateString) => {
      const options = { weekday: "long" };
      const date = new Date(
        dateString.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1")
      );
      return date.toLocaleDateString("en-US", options);
    };
  
    useEffect(() => {
      fetchTimetableData();
    }, [active]);
  
    return (
      <div className="HourComponent  DateBox">
        {timetable.map((entry, index) => (
          <div key={index} className="HourBox">
            {convertDateToDay(active) === entry.day && (
              <div
                className={`time Box ${
                  activeHour && entry.period == activeHour.period ? "activeBox" : ""
                }`}
                onClick={handleHourChange}
                clsname={entry.class_name}
                period={entry.period}
                subcode={entry.sub_code}
              >
                <span className="day">
                  {entry.sub_code} - {entry.class_name}
                </span>
                <span className="daynum">{entry.period}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

export default HourComponent;