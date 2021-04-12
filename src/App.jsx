import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import fire from "./firebase";

//Student side:
import Proctor from "./Pages/Proctor/Proctor";
import LoginPage from "./Pages/Login/LoginPage";
import Homepage from "./Pages/HomePage/HomePage";

//Moderator side:
import ModeratorMainPage from "./Pages/Moderator/ModeratorMainPage";
import ModeratorPage from "./Pages/Moderator/ModeratorPage";
import StudentLog from "./Pages/Moderator/StudentLog";

var db = fire.firestore();
const App = () => {
  const [uid, setUid] = useState(null);
  const [isStudent, setIsStudent] = useState(null);
  const [examID, setExamID] = useState(null);

  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
        db.collection("usersInfo")
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              setIsStudent(doc.data().isStudent);
            }
          });
      } else {
        setUid("");
      }
    });
  }, []);

  if (!uid && !isStudent) {
    return <LoginPage />;
  }

  console.log(isStudent);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            path="/proctor"
            exact
            render={() => <Proctor uid={uid} examID={examID} />}
          />
          <Route 
            path="/moderator" 
            exact
            render={() => <ModeratorPage examID={examID} />} 
          />
          <Route path="/studentLog" component={StudentLog} />
          {isStudent ? (
            <Route
              path="/*"
              exact
              render={() => <Homepage uid={uid} setExamID={setExamID} />}
            />
          ) : (
            <Route 
              path="/*" 
              exact
              render={() => <ModeratorMainPage uid={uid} setExamID={setExamID} />} 
            />
          )}
        </Switch>
      </Router>
    </div>
  );
};

export default App;
