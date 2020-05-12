import React from 'react';
import { Table, Divider, Tag } from 'antd';
import styles from './index.module.scss';
// import { withRouter } from "react-router-dom";


const columns = [
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
export default (props) => (
  <div className={styles.container}>
    <div id="components-table-demo-basic">
      <Table columns={columns} dataSource={props.sourceList} rowKey="id" />
    </div>
  </div>
);
