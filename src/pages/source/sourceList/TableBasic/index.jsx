import React from 'react';
import { withRouter } from "react-router-dom";
import { Table, Divider, Tag, message } from 'antd';
import styles from './index.module.scss';
import request from "../../../../utils/request";
import { Component } from 'react';
// import { withRouter } from "react-router-dom";


class TableS extends Component {
  constructor(props) {
    super(props)
    this.columns = [
      {
        title: '资源名称',
        dataIndex: 'sourceName',
        key: 'sourceName',
        render: text => <span>{text}</span>,
      },
      {
        title: '介绍',
        dataIndex: 'sourceIntro',
        key: 'sourceIntro',
      },
      {
        title: '标签',
        key: 'sourceLabels',
        dataIndex: 'sourceLabels',
        render: sourceLabels => (
          <span>
            {sourceLabels.split(',').map(tag => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
    
              if (tag === 'loser') {
                color = 'volcano';
              }
    
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        ),
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
      pathname: '/source/edit',
      state:{
        id
      }
    })
  }
  async deleteItem(id) {
    const result = await request('/admin/source/delete', 'post', {
      id
    })
    if (result.code === 200) {
      message.success(`已删除`)
      this.props.getList()
    }
  }
  render() {
    const {sourceList} = this.props
    return (
      <div className={styles.container}>
    <div id="components-table-demo-basic">
      <Table columns={this.columns} dataSource={sourceList} rowKey="id" />
    </div>
  </div>
    )
  }

}
 export default withRouter(TableS)
