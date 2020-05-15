import React, {Component} from 'react';
import { Table, Divider, Tag, message } from 'antd';
import request from "../../../../utils/request";
import styles from './index.module.scss';
import { withRouter } from "react-router-dom";

class TableBasic extends Component {
  constructor(props) {
    super(props)
    this.columns = [
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        render: text => <span>{text}</span>,
      },
      {
        title: '主题',
        dataIndex: 'topic',
        key: 'topic',
      },
      {
        title: '标签',
        key: 'labels',
        dataIndex: 'labels',
        render: labels => (
          <span>
            {
            labels.map( tag=> {
              let color = 'geekblue'
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })
            }
          </span>
        ),
      },
      {
        title: '阅读量',
        dataIndex: 'clickSum',
        key: 'clickSum',
      },
      {
        title: '评论数量',
        dataIndex: 'commentSum',
        key: 'commentSum',
      },
      {
        title: '操作',
        key: 'action',
        dataIndex: 'action',
        render: (val, row) => (  //当前行的值text||当前行数据||行索引
          <span>
            <span onClick={(e) => this.modify(row.id)} style={{'cursor': 'pointer'}}>修改 {row.name}</span>
            <Divider type="vertical" />
            <span onClick={(e) => this.deleteItem(row.id)} style={{'cursor': 'pointer'}}>删除</span>
            <Divider type="vertical" />
        <span onClick={(e) => this.updateStatus(row.id, row.status)} style={{'cursor': 'pointer'}}>{row.status === 1 ? '下架' : '上架'}</span>
          </span>
        ),
      },
    ];

    this.modify = this.modify.bind(this)
    this.updateStatus = this.updateStatus.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
  }

  modify(id) {
    this.props.history.push({
      pathname: '/article/edit',
      state:{
        id
      }
    })
    console.log(this)
  }
  async updateStatus(id, status) {
   const result = await request('/admin/article/updateStatus', 'post', {
      id,
      status: status === 1 ? 2 : 1,
    })
    if (result.code === 200) {
      message.success(`已${status === 1 ? '下架' : '上架'}`)
      this.props.getList()
    }
  }
  async deleteItem(id) {
    const result = await request('/admin/article/delete', 'post', {
      id
    })
    if (result.code === 200) {
      message.success(`已删除`)
      this.props.getList()
    }
   
  
  }
  render() {
    return (
      <div className={styles.container}>
    <div id="components-table-demo-basic">
      <Table columns={this.columns} dataSource={this.props.articleList} />
    </div>
  </div>
    )
  }
}

export default withRouter(TableBasic)