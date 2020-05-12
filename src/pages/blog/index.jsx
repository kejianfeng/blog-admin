/* eslint-disable react/no-unused-state */
import React, { Fragment, Component } from "react";
import { Input, Button, Timeline, Upload, message } from "antd";
import request from "../../utils/request";
import styles from "./index.module.scss";
const { TextArea } = Input;

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogPic: null,
      mainBody: "",
      labels: "",
      articleList: []
    };
    this.mainBodyChange = this.mainBodyChange.bind(this);
    this.labelChange = this.labelChange.bind(this);
    this.submitBlog = this.submitBlog.bind(this);
  }
  componentDidMount() {
    this.getList();
  }
  async getList() {
    const result = await request("/blog/blogList", "get");
    // const data = result.data.map( item =>{
    //   item.labels = item.labels.split(',')
    //   item.key = item.id
    //   return item
    // })
    console.log('呀呀呀呀呀呀', result.data);
    this.setState({
      articleList: result.data,
    });
  }
  beforeUpload = (file) => {
    //自定义上传
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async (e) => {
      const result = await request("/upload", "post", {
        file: e.target.result,
      }).catch((err) => {
        message.error("上传出错");
      });
      // console.log(result)
      if (result.code === 200) {
        this.setState({
          blogPic: result.data.picUrl,
        });
        message.success("图片上传成功");
      } else {
        message.error("图片上传失败");
      }
    };
    return false;
  };
  mainBodyChange(e) {
    this.setState({
      mainBody: e.target.value,
    });
  }
  labelChange(e) {
    this.setState({
      labels: e.target.value,
    });
  }
  async submitBlog() {
    const { blogPic, mainBody, labels } = this.state;
    const blogData = {
      blogPic,
      mainBody,
      labels,
    };
    await request("/blog/add", "post", blogData);
    message.success("发布成功");
    this.getList()
  }

  render() {
    console.log('万丈拉', this.state.articleList)
    return (
      <Fragment>
        <div className="container-a">
          <div className="section">
            <div className={styles.blog}>
              <p className={styles.title}>发布动态</p>
              <div className={styles.edit_area}>
                <TextArea
                  rows={5}
                  value={this.state.mainBody}
                  onChange={this.mainBodyChange}
                  placeholder="记录今天的心情..."
                  className={styles.text_area}
                ></TextArea>
                <div className={styles.opreate_area}>
                  <div className={styles.option}>
                    <span className={styles.option_unit}># 标签</span>
                    <Input
                      type="text"
                      placeholder="以,号分割"
                      onChange={this.labelChange}
                      value={this.state.labels}
                    ></Input>
                  </div>
                  <Button
                    className={styles.submit_btn}
                    type="primary"
                    onClick={this.submitBlog}
                  >
                    提交
                  </Button>
                </div>
                <Upload
                  onChange={this.handleUpload}
                  beforeUpload={this.beforeUpload}
                  fileList={this.state.fileList}
                >
                  <Button>点击上传图片</Button>
                </Upload>
                {this.state.blogPic && (
                  <div className={styles.picPreview}>
                    <img src={this.state.blogPic} alt="." />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="container-a">
          <div className="section">
            <p className={styles.title}>已发布动态</p>
            <Timeline>
              {this.state.articleList.map((item) => (
                <Timeline.Item key={item.id}>
                  <div className={styles.blog_item}>
                    <div className={styles.date}>{item.createTime}</div>
                    <p className={styles.blog_content}>{item.mainBody}</p>
                    <div className={styles.pic}>
                      <img src={item.blogPic} alt="."></img>
                    </div>
                    <div className={styles.labels}>
                      {item.labels.split(",").map((label) => (
                        <span key={label}>{label}</span>
                      ))}
                    </div>
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Blog;
