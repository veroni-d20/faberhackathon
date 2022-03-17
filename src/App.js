import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateBrand from "./CreateBrand";
import "./scss/style.scss";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={CreateBrand} />
      </Switch>
    </Router>
  );
}
