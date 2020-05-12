// import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { Component } from 'react';
import { Form, Input,Select, Button,Upload, message } from 'antd';
import request from "../../../utils/request";
import {ArrowLeftOutlined} from '@ant-design/icons'
import styles from './index.module.scss';

const FormItem = Form.Item;
const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 },
};

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sitePic:''
    }
  }

  async formSubmit(value) {
    const params = Object.assign({}, value, {sitePic: this.state.sitePic})
    const result = await request('/site/add', 'post', params)
    if (result.code === 200) {
      message.success('添加站点成功')
      this.props.history.push('/site')
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
          sitePic: result.data.picUrl
        })
        message.success('图片上传成功')

      } else {
        message.error('图片上传失败')
      }
    }
    return false

  };
  render() {
    return (
      <div className="container-a">
         <div className="section">
           <div className={styles.back}>
             <ArrowLeftOutlined className={styles.arrow} onClick={() => {
                  this.props.history.push("/article");
                }}/>
              站点编辑
           </div>
           
         </div>
        <div className="section">
        <div className={styles.edit_wrap}>
          <Form onFinish={this.formSubmit.bind(this)}>
            <FormItem label="站点名称" name="siteName" {...formItemLayout}
              rules={[{ required: true, message: '站点名称啊' }]}
            >
            <Input />
            </FormItem>
            <FormItem label="站点地址" name="siteUrl" {...formItemLayout}
              rules={[{ required: true, message: '输入地址啊' }]}
            >
            <Input />
            </FormItem>
            <FormItem label="站点介绍" name="siteIntro" {...formItemLayout}
              rules={[{ required: true, message: '输入标题啊' }]}
            >
            <Input />
            </FormItem>
            <FormItem label="站点分类" name="siteClassify" {...formItemLayout}
              rules={[{ required: true, message: '输入分类' }]}
            >
              <Select defaultValue="lucy" style={{ width: 120 }}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </FormItem>
            <FormItem label="站点图片"{...formItemLayout}>
              <Upload
                  beforeUpload={this.beforeUpload}
                >
                <Button>点击上传图片</Button>
                {
                  this.state.sitePic && <div className={styles.picPreview}><img src={this.state.sitePic} alt="."/></div>
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

export default Edit;
// export default Edit
