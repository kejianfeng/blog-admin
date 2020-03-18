// import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { Fragment, Component } from 'react';
import { Form, Input, Icon, Select, Checkbox, Button } from 'antd';
import ReactQuill from 'react-quill'; // ES6
import {modules, formats} from '../../../../config/editorConfig';
import styles from './index.less';
import 'react-quill/dist/quill.snow.css'; // ES6

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 },
};

const formItemEditorLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

// const { Search } = Input;
const formMap = {
  // onValuesChange(_, changeVal, allVals) {
  //   console.log('当前元素', changeVal);
  //   console.log('所有元素', allVals);
  // },

};

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleContent: '',
    };
    this.handleChangeArticle = this.handleChangeArticle.bind(this);
    this.submitForm = this.submitForm.bind(this)
  }

  handleChangeArticle(value) {
    this.setState({
      articleContent: value,
    });
  }

  submitForm() {
    const {validateFields} =  this.props.form
    validateFields((err, values) => {
      if (err) {
        console.log('检验出错', err)
      }else {
        Object.assign({}, values, {
            articleContent: this.state.articleContent
          })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="container-a">
        <div className={styles.edit_wrap}>
          <Form>
            <FormItem label="文章标题" {...formItemLayout}>
              {getFieldDecorator('title', {
                rules: [{ required: true, message: '输入标题啊' }],
              })(<Input />)}
            </FormItem>
            <FormItem label="文章主题" {...formItemLayout}>
              {getFieldDecorator('topic', {
                rules: [{ required: true, message: '输入标题啊' }],
              })(<Input />)}
            </FormItem>
            <FormItem label="文章标签" {...formItemLayout}>
              {getFieldDecorator('labels', {
                rules: [{ required: true, message: '输入标题啊' }],
              })(<Input />)}
            </FormItem>
            <FormItem label="文章摘要" {...formItemLayout}>
              {getFieldDecorator('summary', {
                rules: [{ required: true, message: '输入标题啊' }],
              })(<Input />)}
            </FormItem>
            <FormItem label="文章内容" {...formItemEditorLayout}>
              <ReactQuill
                theme="snow"
                value={this.state.articleContent}
                onChange={this.handleChangeArticle}
                modules={modules}
                formats={formats}
                // {...editorConfig}
              ></ReactQuill>
            </FormItem>
            <FormItem wrapperCol={{ span: 12, offset: 3 }}>
              <Button type="primary" htmlType="submit" onClick={this.submitForm}>
                提交
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

export default Form.create(formMap)(Edit);
