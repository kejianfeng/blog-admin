import React from 'react';
import { Table, Divider, Tag } from 'antd';
import styles from './index.module.scss';

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
        {labels.map(tag => {
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
    title: '阅读量',
    dataIndex: 'clickNum',
    key: 'clickNum',
  },
  {
    title: '评论数量',
    dataIndex: 'commentNum',
    key: 'commentNum',
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <span>修改 {record.name}</span>
        <Divider type="vertical" />
        <span>删除</span>
        <Divider type="vertical" />
        <span>上架</span>
      </span>
    ),
  },
];
const data = [
  {
    key: '1',
    title: 'V8技术啊啊啊',
    topic: '生命',
    labels: ['nice', 'developer'],
    clickNum: 68,
    commentNum:89,

  },
  // {
  //   key: '2',
  //   name: 'Jim Green',
  //   age: 42,
  //   address: 'London No. 1 Lake Park',
  //   labels: ['loser'],
  // },
  // {
  //   key: '3',
  //   name: 'Joe Black',
  //   age: 32,
  //   address: 'Sidney No. 1 Lake Park',
  //   labels: ['cool', 'teacher'],
  // },
];
export default () => (
  <div className={styles.container}>
    <div id="components-table-demo-basic">
      <Table columns={columns} dataSource={data} />
    </div>
  </div>
);
