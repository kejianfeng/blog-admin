// import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { Component } from 'react';
import { Form, Input, Button,Upload, message } from 'antd';
import request from "../../../utils/request";
import {ArrowLeftOutlined} from '@ant-design/icons'
import styles from './index.module.scss';

const FormItem = Form.Item;
// const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 },
};

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sourceShoot:''
    }
  }

  async formSubmit(value) {
    const params = Object.assign({}, value, {sourceShoot: this.state.sourceShoot})
    const result = await request('/source/add', 'post', params)
    result.code === 200 && message.success('资源添加成功')
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

  };
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
          <Form onFinish={this.formSubmit.bind(this)}>
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

export default Edit;
// export default Edit
