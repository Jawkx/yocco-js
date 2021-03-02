import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { getStudent } from "./ModeratorFunction";

const ModeratorPage = (props) => {
  
  const [student, setStudent] = useState([]);
  const examID = useParams().id;

  useEffect(() => {
    getStudent(examID, setStudent);
  }, []);


  return(
    <div>
      <h3>
        Exam ID: {examID}
      </h3>
      <br></br>
        {student.map(student => (
          <Link
          to={{
            pathname:`/studentlog/${student}`,
            state: { examID: examID }
          }}
          >
            {student}
          <br></br>
          </Link>
        ))}
    </div>
  )
};

export default ModeratorPage;