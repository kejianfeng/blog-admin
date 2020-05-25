// import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { Fragment,Component } from 'react';
// import { Spin } from 'antd';
import { Button } from 'antd';
import styles from './index.module.scss';
import TableBasic from './TableBasic';
import request from "../../../utils/request";

class SourceList  extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sourceList:[]
    };
    this.getList = this.getList.bind(this)
  }
  async getList() {
    const result = await request('/source/sourceList', 'get')
    this.setState({
      sourceList: result.data
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
          <Button type="primary" size="large" onClick={() => {this.props.history.push('/source/edit')}}>
            添加资源
          </Button>
        </div>
       </div>
      </div>
      <div className="container-a">
        <div className="section">
          <div className={styles.table}>
            <TableBasic sourceList={this.state.sourceList} getList={this.getList}></TableBasic>
          </div>
        </div>
      </div>
    </Fragment>
    )
  }
}

export default  SourceList
