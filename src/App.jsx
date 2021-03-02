import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Student side:
import Proctor from "./Pages/Proctor/Proctor";
import LoginPage from "./Pages/Login/LoginPage";
import Homepage from "./Pages/HomePage/HomePage";

//Moderator side:
import ModeratorMainPage from "./Pages/Moderator/ModeratorMainPage";
import ModeratorPage from "./Pages/Moderator/ModeratorPage";
import StudentLog from "./Pages/Moderator/StudentLog";

const App = () => {
  const [user, setUser] = useState("efykj1");
  const [examID, setExamID] = useState("TEST1");
  return (
    <div className="App">
      <Router>
        <Route
          path="/login"
          render={() => <LoginPage setUser={setUser} user={user} />}
        />
        <Route
          path="/proctor"
          render={() => <Proctor uid={user} examID={examID} />}
        />
        <Route 
          path="/homepage" 
          render={() => <Homepage uid={user} />} 
        />
        <Route
          path="/moderatorMain"
          render={() => <ModeratorMainPage/>}
        />
        <Route
          path="/moderator/:id"
          render={() => <ModeratorPage />}
        />
        <Route
          path="/studentLog/:id"
          component={StudentLog}
        />
      </Router>
    </div>
  );
};

export default App;
