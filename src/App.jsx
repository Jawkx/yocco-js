import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Proctor from "./Pages/Proctor/Proctor";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Route path="/proctor" render={() => <Proctor />} />
      </Router>
    </div>
  );
};

export default App;
