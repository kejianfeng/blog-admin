import React, { Component } from "react";
import styles from "./index.module.scss";
import { BrowserRouter as Router, Route, Switch,withRouter} from "react-router-dom";
import article from '../pages/article/articleList/index';
import blog from '../pages/blog/index';
import contact from '../pages/contact/index';
import picture from '../pages/picture/index';
import site from '../pages/site/index';
import source from '../pages/source/index';
import HeadBar from "../components/HeadBar";
import SideBar from "../components/SideBar";


class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
     <Router>
        <div className={styles.layout_box}>
        <HeadBar></HeadBar>
        <SideBar></SideBar>
        <div className={styles.main_box}>
            <Switch>
              <Route exact  path="/"  component={article}/>
              <Route path="/article"  component={article}/>
              <Route  path="/blog" component={blog}></Route >
              <Route  path="/contact" component={contact}></Route >
              <Route  path="/picture" component={picture}></Route >
              <Route  path="/site" component={site}></Route >
              <Route  path="/source" component={source}></Route >
            </Switch>
        </div>
      </div>
     </Router>
    );
  }
}

export default withRouter(Layout);