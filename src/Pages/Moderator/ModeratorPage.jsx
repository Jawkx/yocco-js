import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useInterval } from "./useInterval";
import { getStudent } from "./ModeratorFunction";

const ModeratorPage = (props) => {
  
  const [studentData, setStudentData] = useState([]); 
  const examID = useParams().id;


  useEffect(() => {
    getStudent(examID, setStudentData);
  }, []);

  useInterval(() => {
    if (studentData) {
      getStudent(examID, setStudentData)
    }
  }, 10000);

  return(
    <div>
      <h3>
        Exam ID: {examID}
      </h3>
      <br></br>
        {studentData.map(item => (
          <div>
            <Link
            to={{
              pathname:`/studentlog/${item[0]}`,
              state: { examID: examID }
            }}
            >
              {item[0]}
            <br></br>
            </Link>
            {item[1]}
          </div>
        ))}
    </div>
  )
};

export default ModeratorPage;