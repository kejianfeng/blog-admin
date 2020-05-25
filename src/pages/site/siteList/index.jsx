// import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { Fragment,Component } from 'react';
import { Button } from 'antd';
import { withRouter } from "react-router-dom";
import styles from './index.module.scss';
import TableBasic from './TableBasic';
import request from "../../../utils/request";


class ArticleList  extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siteList:[]
    };
    this.getList=this.getList.bind(this)
  }
  async getList() {
    const result = await request('/home/sitelist', 'get')
    const data = result.data.map( item =>{
      item.key = item.id
      return item
    })
    this.setState({
      siteList: data
    })
  }
  componentWillMount() {
    this.getList()
  }

  render() {
    return (
      <Fragment>
      <div className="container-a">
       <div className="section">
        <div className={styles.operate}>
          <Button type="primary" size="large" onClick={() => {this.props.history.push('/site/edit')}}>
            添加站点
          </Button>
        </div>
       </div>
      </div>
      <div className="container-a">
        <div className="section">
          <div className={styles.table}>
            <TableBasic siteList={this.state.siteList} getList={this.getList}></TableBasic>
          </div>
        </div>
      </div>
    </Fragment>
    )
  }
}

export default  withRouter(ArticleList)
