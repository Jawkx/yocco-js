import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Proctor from "./Pages/Proctor/Proctor";
import LoginPage from "./Pages/Login/LoginPage";

const App = () => {
  const [user, setUser] = useState(null);
  return (
    <div className="App">
      <Router>
        <Route path="/proctor" render={() => <Proctor uid={user} />} />
        <Route path="/login" render={() => <LoginPage setUser={setUser} />} />
      </Router>
    </div>
  );
};

export default App;
