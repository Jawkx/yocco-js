import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { getExam } from "./ModeratorFunction";

const ModeratorMainPage = () => {
  const [exam, setExam] = useState([])
  

  useEffect(() => {
    getExam(setExam);
  }, []);
  
  return(
    <div>
      <h1>Moderator Main Page</h1>
      <br></br>
      {exam.map(exam => (
        <Link
        to={{
          pathname:`/moderator/${exam}`,
          state: {examID : exam}
        }}
        >
          {exam}
          <br></br>
        </Link>
      ))}
    </div>
  )
};

export default ModeratorMainPage;