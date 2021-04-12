import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useInterval } from "./useInterval";

//Chart
import { LogChart, LogChartPhone } from "./LogChart";

//Function library
import { 
  getStudentLog, 
  getStudentLogPhone, 
} from "./ModeratorFunction";

const StudentLog = () => {
  
  let location = useLocation();
  const studentID = location.state.id;
  const examID = location.state.examID;
  const examIDPhone = examID + "-PHONE";
  const [studentLog, setStudentLog] = useState([]);
  const [chartLabel, setChartLabel] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [studentLogPhone, setStudentLogPhone] = useState([]);
  const [chartLabelPhone, setChartLabelPhone] = useState([]);
  const [chartDataPhone, setChartDataPhone] = useState([]);

  // useEffect(() => {
  //   getStudentLog(examID, studentID, setStudentLog, setChartLabel, setChartData);
  //   getStudentLogPhone(examIDPhone, studentID, setStudentLogPhone, setChartLabelPhone, setChartDataPhone);
  // }, []);

  // useInterval(() => {
  //   getStudentLog(examID, studentID, setStudentLog, setChartLabel, setChartData);
  //   getStudentLogPhone(examIDPhone, studentID, setStudentLogPhone, setChartLabelPhone, setChartDataPhone);
  // }, 10000);
  
  console.log(examID)
  console.log(studentID)

  return(
    <>yo</>
    // <div>
    //   <h2>SUSPICIOUS LOG OF {studentID} IN {examID}</h2>
    //   <h3>Webcam Detection: </h3>
    //   <LogChart
    //     chartLabel = { chartLabel }
    //     chartData = { chartData }
    //     studentLog = { studentLog }
    //   />
    //   <h3>Phone Detection: </h3>
    //   <LogChartPhone 
    //     chartLabel = { chartLabelPhone } 
    //     chartData = { chartDataPhone }
    //     studentLog = { studentLogPhone }
    //   />
    // </div>
  )
};

export default StudentLog;