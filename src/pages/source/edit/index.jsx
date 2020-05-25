// import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { Component } from 'react';
import { Form, Input, Button,Upload, message } from 'antd';
import request from "../../../utils/request";
import { withRouter } from "react-router-dom";
import {ArrowLeftOutlined} from '@ant-design/icons'
import styles from './index.module.scss';

const FormItem = Form.Item;
// const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 },
};

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sourceShoot:'',
      sourceId:null
    }
    this.myRef = React.createRef();
  }

  async formSubmit(value) {
    const { sourceId } = this.state;
    const url = sourceId ? "/admin/source/update" : "/admin/source/add";
    const params = Object.assign({}, value, {sourceShoot: this.state.sourceShoot})
    sourceId && (params.id = sourceId)
    const result = await request(url, 'post', params)
    if (result.code === 200 ) {
      message.success(sourceId ? '资源修改成功' : '资源添加成功')
      this.props.history.push('/source')
    }

  }
  beforeUpload =  file => { //自定义上传
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = async e => {
      const result = await request("/upload", 'post', {file: e.target.result}).catch(err => {
        message.error('上传出错')
      })
      // console.log(result)
      if (result.code === 200) {
        this.setState({
          sourceShoot: result.data.picUrl
        })
        message.success('图片上传成功')

      } else {
        message.error('图片上传失败')
      }
    }
    return false

  }
  getSourceId() {
    const sourceId = this.props.location.state
      ? this.props.location.state.id
      : "";
    if (sourceId) {
      this.setState({
        sourceId,
      });
      this.getData(sourceId);
    }
  }
  async getData(id) {
    const data = (await request("/source/detail", "post", { id })).data;
    const { sourceName, sourceIntro, sourceIcon, sourceLabels, sourceLink , sourcePassword, sourceShoot} = data;
    this.myRef.current.setFieldsValue({
      sourceName,
      sourceIntro,
      sourceIcon,
      sourceLabels,
      sourceLink,
      sourcePassword
    });
    this.setState({
      sourceShoot
    })
  }
  componentDidMount() {
    this.getSourceId()
  }
  render() {
    return (
      <div className="container-a">
         <div className="section">
           <div className={styles.back}>
             <ArrowLeftOutlined className={styles.arrow} onClick={() => {
                  this.props.history.push("/source");
                }}/>
              站点编辑
           </div>
           
         </div>
        <div className="section">
        <div className={styles.edit_wrap}>
          <Form onFinish={this.formSubmit.bind(this)} ref={this.myRef}>
            <FormItem label="资源名称" name="sourceName" {...formItemLayout}
              rules={[{ required: true, message: '资源名称啊' }]}
            >
            <Input />
            </FormItem>
            <FormItem label="资源介绍" name="sourceIntro" {...formItemLayout}
              rules={[{ required: true, message: '输入介绍啊' }]}
            >
            <Input />
            </FormItem>
            <FormItem label="资源图标" name="sourceIcon" {...formItemLayout}
              rules={[{ required: true, message: '输入图标地址啊' }]}
            >
            <Input />
            </FormItem>
            <FormItem label="资源标签" name="sourceLabels" {...formItemLayout}
              rules={[{ required: true, message: '输入资源标签啊' }]}
            >
            <Input />
            </FormItem>
            <FormItem label="资源链接" name="sourceLink" {...formItemLayout}
              rules={[{ required: true, message: '输入资源链接啊' }]}
            >
            <Input />
            </FormItem>
            <FormItem label="资源密码" name="sourcePassword" {...formItemLayout}
            >
            <Input />
            </FormItem>
            <FormItem label="资源截图"{...formItemLayout}>
              <Upload
                  beforeUpload={this.beforeUpload}
                >
                <Button>点击上传图片</Button>
                {
                  this.state.sourceShoot && <div className={styles.picPreview}><img src={this.state.sourceShoot} alt="."/></div>
                }
              </Upload>
            </FormItem>
            <FormItem wrapperCol={{ span: 12, offset: 3 }}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </FormItem>
          </Form>
        </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Blog);
// export default Edit
