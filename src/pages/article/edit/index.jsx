// import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { Component } from "react";
import { Form, Input, Button, Drawer,Tag,Select,message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import MarkdownEditor from "../../../components/MarkdownEditor/index";
import styles from "./index.module.scss";
import request from "../../../utils/request";
import { withRouter } from "react-router-dom";

const FormItem = Form.Item;
const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 },
};
const MarkdownOption = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

// const formInstance = Form.cre
class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleId: null,
      showDrawer: false,
      editTopic:'',
      topicList:[]
    };
    this.manageTopic = this.manageTopic.bind(this);
    this.getArticleId = this.getArticleId.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.selectChange = this.selectChange.bind(this);
    this.addTopic = this.addTopic.bind(this);
    this.getTopicList = this.getTopicList.bind(this);
    this.myRef = React.createRef();
    this.editor = React.createRef();
  }
  async formSubmit(value) {
    const { articleId } = this.state;
    const {html, markdown} = this.editor.current.state
    const url = articleId ? "/admin/article/update" : "/admin/article/add";
    const params = Object.assign({}, value, {
      mainBody: html,
      markdown: encodeURIComponent(markdown),
      status: 1,
    });
    articleId && (params.id = articleId);
    const result = await request(url, "post", params);
    if (result.code === 200) {
      message.success(articleId ? "文章修改成功" : "文章新增成功");
      this.props.history.push("/article");
    }
  }
  async getData(id) {
    const data = (await request("/admin/article/detail", "post", { id })).data;
    const { title, topic, summary, labels, markdown } = data;
    this.myRef.current.setFieldsValue({
      title,
      topic,
      summary,
      labels,
    });
    this.editor.current.setInitData(markdown);
    // this.editor.current.setText(mainBody, markdown);
  }
  manageTopic() {
    this.setState({
      showDrawer: true,
    });
  }
  onClose = () => {
    this.setState({
      showDrawer: false,
    });
  };
  async addTopic() {
    const {editTopic} = this.state
    if (!editTopic) {
      message.error('要输入主题啊')
      return
    }
    const result = await request('/admin/archives/addTopic/', 'post', {
      name: this.state.editTopic
    })
    if (result.code === 200) {
      this.setState({
        editTopic:''
      })
      message.success('主题添加成功')
      this.getTopicList()
    }
  }
  getArticleId() {
    const articleId = this.props.location.state
      ? this.props.location.state.id
      : "";
    if (articleId) {
      this.setState({
        articleId,
      });
      this.getData(articleId);
    }
  }
  getTopicList() {
    request('/admin/archives/getTopic','get').then(res => {
      res.code === 200 && this.setState({
        topicList: res.data
      })
    })
  }
  inputChange(e, scope) {
    this.setState({
      [scope]: e.target.value
    })
  }
  selectChange(value) {
    this.setState({
      editTopic: value
    })
  }
  componentDidMount() {
    this.getArticleId()
    this.getTopicList()
  }
  render() {
    const {editTopic, topicList} = this.state
    return (
      <div className="container-a">
        <div className="section">
          <div className={styles.back}>
            <ArrowLeftOutlined
              className={styles.arrow}
              onClick={() => {
                this.props.history.push("/article");
              }}
            />
            文章编辑
          </div>
        </div>
        <div className="section">
          <div className={styles.edit_wrap}>
            <Form onFinish={this.formSubmit.bind(this)} ref={this.myRef}>
              <FormItem
                label="文章标题"
                name="title"
                {...formItemLayout}
                rules={[{ required: true, message: "输入标题啊" }]}
              >
                <Input />
              </FormItem>
              <FormItem
                label="文章主题"
                name="topic"
                {...formItemLayout}
              >
                <Select defaultValue={topicList[0] ? topicList[0].name : ''} style={{ width: 120 }} onChange={this.selectChange}>
                  {
                    topicList.map(item => (
                    <Option value={item.name} key={item.id}>{item.name}</Option>
                    ))
                  }
                </Select>
              </FormItem>
              <FormItem {...formItemLayout} label="主题管理">
              <span className={styles.topic_manage} onClick={this.manageTopic}>主题管理</span>
              </FormItem>
              <FormItem
                label="文章摘要"
                name="summary"
                {...formItemLayout}
                rules={[{ required: true, message: "输入标题啊" }]}
              >
                <Input />
              </FormItem>
              <FormItem
                label="文章标签"
                name="labels"
                {...formItemLayout}
                rules={[{ required: true, message: "输入标题啊" }]}
              >
                <Input />
              </FormItem>
              <FormItem label="文章内容" name="mainBody" {...MarkdownOption}>
               <MarkdownEditor ref={this.editor}></MarkdownEditor>
              </FormItem>
              {/* <FormItem label="文章内容" name="mainBody" {...formItemLayout}>
                <RichText
                  articleContent={this.state.articleContent}
                  contentUpdate={this.contentUpdate}
                  ref={this.editor}
                />
              </FormItem> */}
              <FormItem wrapperCol={{ span: 12, offset: 3 }}>
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
              </FormItem>
            </Form>
          </div>
        </div>
        <Drawer
          title="主题管理"
          placement="right"
          onClose={this.onClose}
          maskClosable={true}
          closable={false}
          visible={this.state.showDrawer}
        >
          {
            topicList.length === 0 ? <p>主题空空如也~~</p> :
            topicList.map(item => 
            <Tag color="magenta" className="mb20 mr20" key={item.id}>{item.name}</Tag>
            )
          }
          <div className={styles.editTopic}>
          <Input value={editTopic} className="mt20 mb20" onChange={(e) => this.inputChange(e, 'editTopic')}/>
          <Button type="primary" onClick={this.addTopic}>增加主题</Button>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default withRouter(Edit);
// export default Edit
