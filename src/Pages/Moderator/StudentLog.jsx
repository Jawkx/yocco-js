import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useInterval } from "./useInterval";

import { getStudentLog, getStudentLogPhone } from "./ModeratorFunction";

const StudentLog = (props) => {

  const { examID }  = props.location.state;
  const examIDPhone = examID + "-PHONE";
  const [studentLog, setStudentLog] = useState([]);
  const [studentLogPhone, setStudentLogPhone] = useState([]);
  const studentID = useParams().id;

  useEffect(() => {
    getStudentLog(examID, studentID, setStudentLog);
    getStudentLogPhone(examIDPhone, studentID, setStudentLogPhone);
  }, []);

  useInterval(() => {
    getStudentLog(examID, studentID, setStudentLog);
    getStudentLogPhone(examIDPhone, studentID, setStudentLogPhone);
  }, 10000);

  console.log(studentLog)


  return(
    <div>
      <h2>SUSPICIOUS LOG OF {studentID} IN {examID}</h2>

      <h3>Webcam Detection:</h3>
      <table>
        <thead>
          <td>Time</td>
          <td>Suspicious Speech</td>
          <td>Looking Around</td>
          <td>Suspicious Object</td>
        </thead>
        <tbody>
          {studentLog.map((log) => (
            <tr key={log.time}>
              <td>{log.time}</td>
              <td>{log.suspiciousSpeech}</td>
              <td>{log.lookingAround}</td>
              <td>{log.haveSuspiciousObject}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Phone Detection: </h3>
      <table>
        <thead>
          <td>Time</td>
          <td>Suspicious Object</td>
        </thead>
        <tbody>
          {studentLogPhone.map((log) => (
            <tr key={log.Time}>
              <td>{log.Time}</td>
              <td>{log.SuspiciousObject}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default StudentLog;