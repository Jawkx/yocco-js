import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Proctor from "./Pages/Proctor/Proctor";
import LoginPage from "./Pages/Login/LoginPage";
import Homepage from "./Pages/HomePage/HomePage";

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
        <Route path="/homepage" render={() => <Homepage uid={user} />} />
      </Router>
    </div>
  );
};

export default App;
