// import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { Fragment, Component } from "react";
import { Button, Input } from "antd";
import request from '../../../utils/request'
import styles from './index.module.scss';
import TableBasic from "./TableBasic";
const { Search } = Input;

class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleList:[]
    };
    this.getList = this.getList.bind(this)
  }
  async getList() {
    const result = await request('/article/articleList', 'get')
    const data = result.data.map( item =>{
      item.labels = item.labels.split(',')
      item.key = item.id
      return item
    })
    this.setState({
      articleList: data
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
              <Search
                placeholder="输入搜索内容"
                enterButton="搜索"
                size="large"
                className={styles.search}
                onSearch={value => {
                  console.log(value);
                }}
              ></Search>
              <Button
                type="primary"
                size="large"
                onClick={() => {
                  this.props.history.push("/article/edit");
                }}
              >
                新建文章
              </Button>
            </div>
          </div>
        </div>
        <div className="container-a">
          <div className="section">
            <div className={styles.table}>
              <TableBasic articleList={this.state.articleList} getList={this.getList}/>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ArticleList;
