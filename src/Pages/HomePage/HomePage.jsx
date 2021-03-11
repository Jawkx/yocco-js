import React, { useState, useEffect } from "react";
import { Button, Card, PageHeader, Divider } from "antd";
import { getInfo } from "./homePageFunction";
import "antd/dist/antd.css";
import { Link } from "react-router-dom";
import fire from "../../firebase";

const HomePage = ({ uid, setExamID }) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
  });
  const [examsInfo, setExamsInfo] = useState([]);

  useEffect(() => {
    getInfo(uid, setUserInfo, setExamsInfo);
  }, [uid]);

  const handleGoProctor = (examid) => {
    setExamID(examid);
  };

  const handleLogOut = () => {
    fire.auth().signOut();
  };

  console.log(examsInfo);
  const examsDisplay = examsInfo.map((exam, idx) => (
    <Card
      title={exam.name + "  -  " + exam.id}
      key={idx}
      style={{ width: 400, margin: "30px" }}
    >
      <p>
        {exam.timeStart.toDate().toLocaleTimeString()} to{" "}
        {exam.timeEnd.toDate().toLocaleTimeString()}
      </p>
      <Link to="/proctor">
        <Button onClick={() => handleGoProctor(exam.id)}> Start Exam </Button>
      </Link>
    </Card>
  ));

  return (
    <div>
      <PageHeader
        title={`Welcome ${userInfo.name}, to your dashboard`}
        extra={[
          <Button type="primary" onClick={() => handleLogOut()}>
            Log Out
          </Button>,
        ]}
      />
      <Divider> Your Exams </Divider>
      <div>{examsDisplay}</div>
    </div>
  );
};

export default HomePage;
