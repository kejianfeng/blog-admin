import React, { Component } from "react";
import styles from "./index.module.scss";
import { withRouter, Link, BrowserRouter as Router } from "react-router-dom";
import { Menu } from "antd";
import MenuItem from "antd/lib/menu/MenuItem";

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    return (
      <Router>
        <div className={styles.sidebar_box}>
        <Menu
          onClick={this.handleClick}
          style={{ width: 200 }}
          mode="inline"
        >
          <MenuItem key="1">
            <Link to="/article" >文章</Link>
          </MenuItem>
          <Menu.Item key="2">
            <Link to="/blog" >行博</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/site">站点分享</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/source">资源分享</Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to="/picture">图片分享</Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link to="/message">留言</Link>
          </Menu.Item>
        </Menu>
      </div>
      </Router>
    );
  }
}

export default withRouter(SideBar);
