/* eslint-disable react/no-unused-state */
import React, { Fragment,Component } from 'react';
import { Button, Input } from 'antd';
// import request from '../../utils/request'
import styles from './index.module.scss';

const { Search } = Input;

class ArticleList  extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  

  render() {
    return (
      <Fragment>
      <div className="container-a">
        <div className={styles.operate}>
        <Search 
        placeholder="输入搜索内容"
        enterButton="搜索"
        size="large"
        className={styles.search}
        onSearch={value => {console.log(value)}}
        ></Search>
        <Button type="primary" size="large" onClick={() => {this.props.history.push('/article/edit')}}>
          新建文章
        </Button>
        </div>
      </div>
      <div className="container-a">
        <div className={styles.table}>
          2222
          {/* <TableBasic /> */}
        </div>
      </div>
    </Fragment>
    )
  }
}

export default  ArticleList
