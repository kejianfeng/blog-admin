/* eslint-disable react/no-unused-state */
import React, { Fragment, Component } from "react";
import { Input, Button, Timeline, Upload } from "antd";
import { LinkOutlined } from "@ant-design/icons";
import request from "../../utils/request";
import styles from "./index.module.scss";

const { TextArea } = Input;

class Blog extends Component {
  constructor(props) {
    super(props);
    this.handleUpload = this.handleUpload.bind(this);
    // this.beforeUpload = this.beforeUpload.bind(this)
  }

  state = {
    fileList: [],
    uploading: false
  };

  handleUpload = ({file}) => {
    console.log(file)
    console.log(22222);
    // const { fileList } = this.state;
    // console.log(this.state);
    // const formData = new FormData();
    // fileList.forEach(file => {
    //   formData.append("files", file);
    // });

    // this.setState({
    //   uploading: true
    // });

    request("/upload", 'post', file).then(res => {
      console.log(res);
    });
  };

  beforeUpload = file => {
    this.setState({
      fileList: [file]
    });
    console.log("1111111", file);
    return false;
  };

  render() {
    return (
      <Fragment>
        <div className="container-a">
          <div className="section">
            <div className={styles.blog}>
              <p className={styles.title}>发布动态</p>
              <div className={styles.edit_area}>
                <TextArea
                  rows={5}
                  placeholder="记录今天的心情..."
                  className={styles.text_area}
                ></TextArea>
                <div className={styles.opreate_area}>
                  <div className={styles.option}>
                    <span className={styles.option_unit}>
                      <LinkOutlined className={styles.icon} />
                      链接
                    </span>
                    <span className={styles.option_unit}># 标签</span>
                  </div>
                  <Button
                    className={styles.submit_btn}
                    type="primary"
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
                <img src='https://jamki.oss-cn-shenzhen.aliyuncs.com/independent-dwz.png?Expires=1586021952&OSSAccessKeyId=TMP.3Kk7dczQZ1dqDXVcX1Fmx2cKV92f19BHm6Dr3JUtn9D4UYQNyxKUMW7pvsFtWY5gZwKptw9PAt4169WJEcQkmaMCWk7nhk&Signature=gyjEMgrv%2FSHctz%2BDmzkSAcmp1Lw%3D' alt="."/>
              </div>
            </div>
          </div>
        </div>
        <div className="container-a">
          <div className="section">
          <p className={styles.title}>已发布动态</p>
          <Timeline>
            <Timeline.Item>
              <div className={styles.blog_item}>
                <div className={styles.date}>2020-02-12</div>
                <p className={styles.blog_content}>
                  枫叶是枫树的叶子，一般为掌状五裂，长约13厘米，宽略大于掌，3片最大的裂片具少数突出的齿，基部为心形，叶面粗糙，上面为中绿至暗绿
                </p>
                <div className={styles.pic}>
                  <img
                    src="http://pic1.win4000.com/wallpaper/4/564ae587e5ba8.jpg"
                    alt="."
                  ></img>
                </div>
                <div className={styles.labels}>
                  <span>你我之间</span>
                  <span>小城大事</span>
                </div>
              </div>
            </Timeline.Item>
            <Timeline.Item>
              Solve initial network problems 2015-09-01
            </Timeline.Item>
            <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
            <Timeline.Item>
              Network problems being solved 2015-09-01
            </Timeline.Item>
          </Timeline>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Blog;
