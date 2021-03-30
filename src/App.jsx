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
import ModeratorLogin from "./Pages/Moderator/ModeratorLogin";

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

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            path="/proctor"
            exact
            render={() => <Proctor uid={uid} examID={examID} />}
          />
          <Route path="/moderator/:id" render={() => <ModeratorPage />} />
          <Route path="/studentLog/:id" component={StudentLog} />
          {isStudent ? (
            <Route
              path="/*"
              exact
              render={() => <Homepage uid={uid} setExamID={setExamID} />}
            />
          ) : (
            <Route path="/moderatorMain" render={() => <ModeratorMainPage />} />
          )}
        </Switch>
      </Router>
    </div>
  );
};

export default App;
