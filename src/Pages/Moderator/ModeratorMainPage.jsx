import React, { useState, useEffect } from "react";
import fire from "../../firebase";
import { useParams, Link, useHistory } from "react-router-dom";

import { getExam } from "./ModeratorFunction";

const ModeratorMainPage = (props) => {

  const [exam, setExam] = useState([])
  const { modName }  = props.location.state;
  let history = useHistory();

  const handleLogout = () => {
    fire.auth().signOut();
    history.push("/moderatorLogin");
  };

  useEffect(() => {
    getExam(setExam, modName);
  }, []);
  
  return(
    <div>
			<button onClick={handleLogout}>
				Logout
			</button>
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