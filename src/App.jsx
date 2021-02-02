import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Proctor from "./Pages/Proctor/Proctor";
import LoginPage from "./Pages/Login/LoginPage";


const App = () => {
  return (
    <div className="App">
      <Router>
        <Route path="/proctor" render={() => <Proctor />} />
        <Route path="/login" render={() => <LoginPage />} />
      </Router>
    </div>
  );
};

export default App;
