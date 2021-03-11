import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useInterval } from "./useInterval";

//Chart
import { LogChart, LogChartPhone } from "./LogChart";

//Function library
import { 
  getStudentLog, 
  getStudentLogPhone, 
} from "./ModeratorFunction";

const StudentLog = (props) => {

  const { examID }  = props.location.state;
  const examIDPhone = examID + "-PHONE";
  const [studentLog, setStudentLog] = useState([]);
  const [chartLabel, setChartLabel] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [studentLogPhone, setStudentLogPhone] = useState([]);
  const [chartLabelPhone, setChartLabelPhone] = useState([]);
  const [chartDataPhone, setChartDataPhone] = useState([]);
  const studentID = useParams().id;

  useEffect(() => {
    getStudentLog(examID, studentID, setStudentLog, setChartLabel, setChartData);
    getStudentLogPhone(examIDPhone, studentID, setStudentLogPhone, setChartLabelPhone, setChartDataPhone);
  }, []);

  useInterval(() => {
    getStudentLog(examID, studentID, setStudentLog, setChartLabel, setChartData);
    getStudentLogPhone(examIDPhone, studentID, setStudentLogPhone, setChartLabelPhone, setChartDataPhone);
  }, 10000);

  return(
    <div>
      <h2>SUSPICIOUS LOG OF {studentID} IN {examID}</h2>
      <h3>Webcam Detection: </h3>
      <LogChart
        chartLabel = { chartLabel }
        chartData = { chartData }
        studentLog = { studentLog }
      />
      <h3>Phone Detection: </h3>
      <LogChartPhone 
        chartLabel = { chartLabelPhone } 
        chartData = { chartDataPhone }
        studentLog = { studentLogPhone }
      />
      {/* <table>
        <thead>
          <td>Time</td>
          <td>Suspicious Object</td>
        </thead>
        <tbody>
          {studentLogPhone.map((log) => (
            <tr key={log.Time}>
              <td>{log.Time}</td>
              <td>{log.SuspiciousObject}</td>
              <td><button onClick ={() => openImage(log.Image)}>See Image</button></td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  )
};

export default StudentLog;