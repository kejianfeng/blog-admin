import React from "react";
import "./App.scss";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Layout from "./layout/index";
import Login from "./pages/login";

function App() {
  return (
     <Router>

       <div className="App">
         <Switch>
            <Route exact path="/login"  component={Login}/>
            <Route component={Layout}/>
         </Switch>
      </div>
    </Router>
  );
}

export default App