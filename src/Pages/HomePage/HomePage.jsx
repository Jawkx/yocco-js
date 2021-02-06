import React, { useState, useEffect } from "react";

import { getInfo } from "./homePageFunction";

const HomePage = ({ uid }) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
  });
  const [examsInfo, setExamsInfo] = useState([]);

  useEffect(() => {
    getInfo(uid, setUserInfo, setExamsInfo);
  }, [uid]);

  console.log(examsInfo);
  const examsDisplay = examsInfo.map((exam, idx) => (
    <li key={idx}>
      <h2>Code: {exam.id} </h2>
      <h2>Title : {exam.name}</h2>
      <h3>
        {exam.timeStart.toDate().toString()} to{" "}
        {exam.timeEnd.toDate().toString()}
      </h3>
    </li>
  ));

  return (
    <section>
      <h1>
        This is account for User {userInfo.name} , ID {uid}{" "}
      </h1>
      <ul>{examsDisplay}</ul>
    </section>
  );
};

export default HomePage;
