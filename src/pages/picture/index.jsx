/* eslint-disable react/no-unused-state */
import React, { Fragment, Component } from "react";
import { withRouter } from "react-router-dom";
import { Input, Button, Upload, message } from "antd";
import request from "../../utils/request";
import styles from "./index.module.scss";

const { TextArea } = Input;

class Picworks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picture: null,
      picText: "",
      labels: "",
      picList: [],
    };
    this.picTextChange = this.picTextChange.bind(this);
    this.labelChange = this.labelChange.bind(this);
    this.submitBlog = this.submitBlog.bind(this);
    this.getList = this.getList.bind(this);
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
          picture: result.data.picUrl,
        });
        message.success("图片上传成功");
      } else {
        message.error("图片上传失败");
      }
    };
    return false;
  };
  picTextChange(e) {
    this.setState({
      picText: e.target.value,
    });
  }
  labelChange(e) {
    this.setState({
      labels: e.target.value,
    });
  }
  async submitBlog() {
    const { picture, picText, labels } = this.state;
    const picWorks = {
      picture,
      picText,
      labels,
    };
    const result = await request("/picwork/add", "post", picWorks);
    if (result.code === 200) {
      message.success("图片作品添加成功");
      window.location.reload();
    }
    return;
  }
  async deleteItem(id) {
    const result = await request('/admin/picwork/delete', 'post', {
      id
    })
    if (result.code === 200) {
      message.success(`已删除`)
      this.getList()
    }
  }
  getList() {
    request("/admin/picwork/picList", "get").then((res) => {
      if (res.code === 200) {
        this.setState({
          picList: res.data,
        });
      }
    });
  }
  componentWillMount() {
    this.getList()
  }
  render() {
    const { picList } = this.state;
    return (
      <Fragment>
        <div className="container-a">
          <div className="section">
            <div className={styles.blog}>
              <p className={styles.title}>发布图片作品</p>
              <div className={styles.edit_area}>
                <TextArea
                  rows={5}
                  value={this.state.picText}
                  onChange={this.picTextChange}
                  placeholder="又一张极具创意图片即将发布"
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
                {this.state.picture && (
                  <div className={styles.picPreview}>
                    <img src={this.state.picture} alt="." />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="section">
            <div className={styles.pic_show}>
              <div className={styles.pic_list}>
                {picList.length > 0 ? (
                  picList.map((item) => 
                    <div className={styles.pic_item} key={item.id}>
                      <Button className={styles.delete_pic} onClick={() => this.deleteItem(item.id )}>删除</Button>
                      <img src={item.picUrl} alt="." />
                    </div>
                  )
                ) : (
                  <p>暂时还没图片啦</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(Picworks);
