import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useInterval } from "./useInterval";
import { Button, Card, PageHeader, Divider, Table } from "antd";

//Chart
import { LogChart, LogChartPhone } from "./LogChart";

//Function library
import { 
  getStudentLog, 
  getStudentLogPhone, 
} from "./ModeratorFunction";
import { Div } from "@tensorflow/tfjs-core";

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
      <PageHeader
        title={`Suspicious Log of ${studentID} in ${examID}`}
        extra={[
          <Link
            to="/moderator"
          >
            <Button type="primary">
              Back to Examination Page
            </Button>,
          </Link>
        ]}
      />
      <div style={{margin: 20}}>
        <Divider orientation="left">Webcam Detection</Divider>
        <LogChart
            chartLabel = { chartLabel }
            chartData = { chartData }
            studentLog = { studentLog }
        />
      </div>
      <div style={{margin: 20, marginTop: 50}}>
        <Divider orientation="left">Phone Detection</Divider>
        <LogChartPhone 
          chartLabel = { chartLabelPhone } 
          chartData = { chartDataPhone }
          studentLog = { studentLogPhone }
        />
      </div>
    </div>

  )
};

export default StudentLog;