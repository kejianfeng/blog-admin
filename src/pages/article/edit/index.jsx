// import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { Component } from 'react';
import { Form, Input, Button, message } from 'antd';
import {ArrowLeftOutlined} from '@ant-design/icons'
import RichText from "../../../components/RichText/index";
import styles from './index.module.scss';
import request from '../../../utils/request'
import { withRouter } from "react-router-dom";


const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 },
};


// const formInstance = Form.cre
class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleContent: '我是剑烽',
      initContent: '' ,//预设值
      title:'',
      topic:'',
      summary:'',
      labels:''
    };
    this.contentUpdate = this.contentUpdate.bind(this);
    this.myRef = React.createRef();
  }
  contentUpdate(value) { //文章内容改变
    this.setState({
      articleContent: value,
    });
  }
  async formSubmit(value) {
    const params = Object.assign({}, value, {mainBody:this.state.articleContent, status:2})
    const result = await request('/article/add','post', params)
    if (result.code === 200) {
      message.success('文章新增成功')
      this.props.history.push('/article')
    }
  }
  async getData(id) {
    const data = (await request('/admin/article/detail', 'post', {id})).data
    console.log(data)
    const {title, topic, summary, labels, mainBody} = data

    this.myRef.current.setFieldsValue({
      title,
      topic,
      summary,
      labels,
    })
    this.setState({
      initContent: mainBody
    })
  }
  componentDidMount() {
    const articleId = this.props.location.state.id
    articleId && this.getData(articleId)
    // console.log(this.myRef.current)
  }
  render() {
    // console.log('啊啊啊',title)
    const {initContent} = this.state
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
          <Form onFinish={this.formSubmit.bind(this)}  ref={this.myRef}>
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
            <FormItem label="文章标签" name="labels" {...formItemLayout}
              rules={[{ required: true, message: '输入标题啊' }]}
            >
            <Input />
            </FormItem>
            <FormItem label="文章内容" name="mainBody" {...formItemLayout}
            >
            <RichText articleContent={this.state.articleContent} contentUpdate={this.contentUpdate} defaultContent={initContent}/>
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

export default withRouter(Edit);
// export default Edit
