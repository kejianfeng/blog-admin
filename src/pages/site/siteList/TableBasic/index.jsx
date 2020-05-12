import React , {Component}from 'react';
import { Table, Divider} from 'antd';
import styles from './index.module.scss';

const columns = [
  {
    title: '站点名称',
    dataIndex: 'site_name',
    key: 'site_name',
    render: text => <span>{text}</span>,
  },
  {
    title: '站点类别',
    dataIndex: 'classify',
    key: 'classify',
  },
  {
    title: '站点地址',
    dataIndex: 'site_url',
    key: 'site_url',
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
class TableC extends Component {
  render() {
    const {siteList} = this.props
    return (
      <div className={styles.container}>
      <div id="sitelist-table">
        <Table columns={columns} dataSource={siteList} />
      </div>
    </div>
    )
  }
}

export default TableC
