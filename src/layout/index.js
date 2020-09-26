import React, { Component } from "react";
import styles from "./index.module.scss";
import { BrowserRouter as Router, Route, Switch,withRouter} from "react-router-dom";
import Login from "../pages/login";
import article from '../pages/article/articleList/index';
import articleEdit from '../pages/article/edit/index';
import blog from '../pages/blog/index';
import contact from '../pages/contact/index';
import picture from '../pages/picture/index';
import site from '../pages/site/siteList/index';
import siteEdit from '../pages/site/edit/index';
import source from '../pages/source/sourceList/index';
import sourceEdit from '../pages/source/edit/index';
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
        <Route  path="/login" component={Login}></Route >
        <div className={styles.layout_box}>
        <HeadBar></HeadBar>
        <SideBar></SideBar>
        <div className={styles.main_box}>
            <Switch>
              <Route exact  path="/"  component={article}/>
              <Route exact path="/article"  component={article}/>
              <Route  path="/blog" component={blog}></Route >
              <Route  path="/contact" component={contact}></Route >
              <Route  path="/picture" component={picture}></Route >
              <Route exact path="/site" component={site}></Route >
              <Route exact path="/source" component={source}></Route >
              <Route  path="/source/edit" component={sourceEdit}></Route >
              <Route  path="/article/edit" component={articleEdit}></Route >
              <Route  path="/site/edit" component={siteEdit}></Route >
            </Switch>
          </div>
        </div>
     </Router>
    );
  }
}

export default withRouter(Layout);