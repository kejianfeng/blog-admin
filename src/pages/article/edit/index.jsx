// import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import {ArrowLeftOutlined} from '@ant-design/icons'
import RichText from "../../../components/RichText/index";
// import {modules, formats} from '../../../../config/editorConfig';
import styles from './index.module.scss';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 },
};

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleContent: '我是剑烽',
      initContent: '' //预设值
    };
    this.contentUpdate = this.contentUpdate.bind(this);
  }

  contentUpdate(value) { //文章内容改变
    this.setState({
      articleContent: value,
    });
  }
  formSubmit(value) {
    const params = Object.assign({}, value, {mainBody:this.state.articleContent})
    console.log('啦啦啦啦', params)
  }
  render() {
    // const { getFieldDecorator } = this.props.form;
    return (
      <div className="container-a">
         <div className="section">
           <div className={styles.back}>
             <ArrowLeftOutlined className={styles.arrow} onClick={() => {
                  this.props.history.push("/article");
                }}/>
              文章编辑
           </div>
           
         </div>
        <div className="section">
        <div className={styles.edit_wrap}>
          <Form onFinish={this.formSubmit.bind(this)}>
            <FormItem label="文章标题" name="title" {...formItemLayout}
              rules={[{ required: true, message: '输入标题啊' }]}
            >
            <Input />
            </FormItem>
            <FormItem label="文章主题" name="topic" {...formItemLayout}
              rules={[{ required: true, message: '输入标题啊' }]}
            >
            <Input />
            </FormItem>
            <FormItem label="文章摘要" name="summary" {...formItemLayout}
              rules={[{ required: true, message: '输入标题啊' }]}
            >
            <Input />
            </FormItem>
            <FormItem label="文章标签" name="lables" {...formItemLayout}
              rules={[{ required: true, message: '输入标题啊' }]}
            >
            <Input />
            </FormItem>
            <FormItem label="文章内容" name="mainBody" {...formItemLayout}
            >
            <RichText articleContent={this.state.articleContent} contentUpdate={this.contentUpdate} defaultContent={this.state.initContent}/>
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
