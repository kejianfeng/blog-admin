import React , {Component}from 'react';
import { withRouter } from "react-router-dom";
import { Table, Divider, message} from 'antd';
import request from "../../../../utils/request";
import styles from './index.module.scss';


class TableC extends Component {
  constructor(props) {
    super(props)
    this.columns = [
      {
        title: '站点名称',
        dataIndex: 'siteName',
        key: 'siteName',
        render: text => <span>{text}</span>,
      },
      {
        title: '站点类别',
        dataIndex: 'classify',
        key: 'classify',
      },
      {
        title: '站点地址',
        dataIndex: 'siteUrl',
        key: 'siteUrl',
      },
      {
        title: '操作',
        key: 'action',
        render: (val, row) => (  //当前行的值text||当前行数据||行索引
          <span>
            <span onClick={(e) => this.modify(row.id)} style={{'cursor': 'pointer'}}>修改 {row.name}</span>
            <Divider type="vertical" />
            <span onClick={(e) => this.deleteItem(row.id)} style={{'cursor': 'pointer'}}>删除</span>
          </span>
        ),
      },
    ];
    this.modify = this.modify.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
  }
  modify(id) {
    this.props.history.push({
      pathname: '/site/edit',
      state:{
        id
      }
    })
    console.log(this)
  }
  async deleteItem(id) {
    const result = await request('/admin/site/delete', 'post', {
      id
    })
    if (result.code === 200) {
      message.success(`已删除`)
      this.props.getList()
    }
  }
  render() {
    const {siteList} = this.props
    return (
      <div className={styles.container}>
      <div id="sitelist-table">
        <Table columns={this.columns} dataSource={siteList} />
      </div>
    </div>
    )
  }
}

export default withRouter(TableC)
