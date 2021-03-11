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

const App = () => {
  const [user, setUser] = useState(null);
  const [examID, setExamID] = useState(null);

  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user.uid);
      } else {
        setUser("");
      }
    });
  }, []);

  if (!user) {
    return <LoginPage />;
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            path="/proctor"
            exact
            render={() => <Proctor uid={user} examID={examID} />}
          />
          <Route
            path="/*"
            exact
            render={() => <Homepage uid={user} setExamID={setExamID} />}
          />
          <Route path="/moderatorMain" render={() => <ModeratorMainPage />} />
          <Route path="/moderator/:id" render={() => <ModeratorPage />} />
          <Route path="/studentLog/:id" component={StudentLog} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
