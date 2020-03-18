import React from "react";
import "./App.scss";
import {BrowserRouter as Router , withRouter} from "react-router-dom";
import Layout from "./layout/index";

function App() {
  return (
     <Router>
       <div className="App">
        <Layout></Layout>
      </div>
    </Router>
  );
}

export default withRouter(App);