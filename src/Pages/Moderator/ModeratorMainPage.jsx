import React, { useState, useEffect } from "react";
import { Button, Card, PageHeader, Divider } from "antd";
import fire from "../../firebase";
import { useParams, Link, useHistory } from "react-router-dom";
import { getExam, getName } from "./ModeratorFunction";
import styles from "./moderatorPage.module.css";

const ModeratorMainPage = ({uid, setExamID}) => {

  const [name, setName] = useState("");
  const [examInfo, setExamInfo] = useState([]);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let history = useHistory();


  console.log(name);

  const handleLogout = () => {
    fire.auth().signOut();
    history.push("/");
  };

  const handleGoProctor = (examid) => {
    setExamID(examid);
  };

  useEffect(() => {
    getExam(uid, setExamInfo);
    getName(uid, setName);
  }, []);
  

  const examsDisplay = examInfo.map((exam, idx) => (
    
    <Card
      title={exam.name + "  -  " + exam.id}
      key={idx}
      style={{ width: 400, margin: "30px" }}
    >
      <p>
        {exam.timeStart.toDate().toDateString()} 
      </p>
      <p>
        {exam.timeStart.toDate().toLocaleTimeString()} to{" "}
        {exam.timeEnd.toDate().toLocaleTimeString()}
      </p>
      <Link to="/moderator">
        <Button onClick={() => handleGoProctor(exam.id)}> Invigilate </Button>
      </Link>
    </Card>
  ));


  return(
    <div>
      <PageHeader
        title={`Welcome ${name}, to your moderator dashboard`}
        extra={[
          <Button type="primary" onClick={() => handleLogout()}>
            Log Out
          </Button>
        ]}
      />
      <Divider> Your Exams </Divider>
      <div>{examsDisplay}</div>
    </div>
  )
};

export default ModeratorMainPage;