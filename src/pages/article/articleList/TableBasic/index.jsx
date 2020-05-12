import React, {Component} from 'react';
import { Table, Divider, Tag } from 'antd';
import styles from './index.module.scss';
import { withRouter } from "react-router-dom";

// import request from "../../../utils/request";


const columns = [
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
        <span onClick={(e) => modify(row.id)} style={{'cursor': 'pointer'}}>修改 {row.name}</span>
        <Divider type="vertical" />
        <span>删除</span>
        <Divider type="vertical" />
        <span>上架</span>
      </span>
    ),
  },
]; 

function modify(id) {
  this.props.history.push({
    pathname: '/article/edit',
    state:{
      id
    }
  })
  console.log(this)
}
class TableBasic extends Component {
  constructor(props) {
    super(props)
    // eslint-disable-next-line no-func-assign
    modify = modify.bind(this)
  }
  modify = modify.bind(this)
  render() {
    return (
      <div className={styles.container}>
    <div id="components-table-demo-basic">
      <Table columns={columns} dataSource={this.props.articleList} />
    </div>
  </div>
    )
  }
}

export default withRouter(TableBasic)