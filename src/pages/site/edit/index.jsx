// import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Form, Input,Select, Button,Upload,Drawer,Tag, message } from 'antd';
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
      sitePic:'',
      showDrawer: false,
      classifyList:[],
      editClassify:'',
      siteId:null
    }
    this.myRef = React.createRef();
    this.manageClassify = this.manageClassify.bind(this);
    this.getSiteId = this.getSiteId.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.selectChange = this.selectChange.bind(this);
    this.addClassify = this.addClassify.bind(this);
  }
  async getData(id) {
    const data = (await request("/admin/site/detail", "post", { id })).data;
    const { siteName, siteUrl, siteText, classify,sitePic } = data;
    this.myRef.current.setFieldsValue({
      siteName,
      siteUrl,
      siteText,
      siteClassify: classify
    });
    this.setState({
      sitePic
    })
  }
  async formSubmit(value) {
    const { siteId } = this.state;
    const url = siteId ? "/admin/site/update" : "/admin/site/add";
    const params = Object.assign({}, value, {sitePic: this.state.sitePic})
    siteId && (params.id = siteId)
    const result = await request(url, 'post', params)
    if (result.code === 200) {
      message.success(siteId ? '修改成功' : '新增成功')
      this.props.history.push('/site')
    }
  }
  manageClassify() {
    this.setState({
      showDrawer: true,
    });
  }
  onClose = () => {
    this.setState({
      showDrawer: false,
    });
  };
  inputChange(e, scope) {
    console.log(e)
    this.setState({
      [scope]: e.target.value
    })
  }
  selectChange(value) {
    this.setState({
      editClassify: value
    })
  }
  async addClassify() {
    const {editClassify} = this.state
    if (!editClassify) {
      message.error('要输入分类啊')
      return
    }
    const result = await request('/admin/archives/addSiteClassify', 'post', {
      name: this.state.editClassify
    })
    if (result.code === 200) {
      this.setState({
        editClassify:''
      })
      message.success('主题添加成功')
      this.getSiteClassifyList()
    }
  }
  getSiteId() {
    const siteId = this.props.location.state
      ? this.props.location.state.id
      : "";
    if (siteId) {
      this.setState({
        siteId,
      });
      this.getData(siteId);
    }
  }
  getSiteClassifyList() { //获取站点分类
    request('/admin/archives/getSiteClassify','get').then(res => {
      res.code === 200 && this.setState({
        classifyList: res.data
      })
    })
  }
  beforeUpload =  file => { //自定义上传
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = async e => {
      const result = await request("/upload", 'post', {file: e.target.result}).catch(err => {
        message.error('上传出错')
      })
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
  componentDidMount() {
    this.getSiteId()
    this.getSiteClassifyList()
    // this.getTopicList()
  }
  render() {
    const {classifyList, editClassify} = this.state
    return (
      <div className="container-a">
         <div className="section">
           <div className={styles.back}>
             <ArrowLeftOutlined className={styles.arrow} onClick={() => {
                  this.props.history.push("/site");
                }}/>
              站点编辑
           </div>
           
         </div>
        <div className="section">
        <div className={styles.edit_wrap}>
          <Form onFinish={this.formSubmit.bind(this)} ref={this.myRef}>
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
            <FormItem label="站点介绍" name="siteText" {...formItemLayout}
              rules={[{ required: true, message: '输入标题啊' }]}
            >
            <Input />
            </FormItem>
            <FormItem label="站点分类" name="siteClassify" {...formItemLayout}
              rules={[{ required: true, message: '输入分类' }]}
            >
               <Select defaultValue={classifyList[0] ? classifyList[0].name : ''} style={{ width: 120 }} onChange={this.selectChange}>
                  {
                    classifyList.map(item => (
                    <Option value={item.name} key={item.id}>{item.name}</Option>
                    ))
                  }
                </Select>
            </FormItem>
            <FormItem {...formItemLayout} label="主题管理">
              <span className={styles.classify_manage} onClick={this.manageClassify}>主题管理</span>
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
        <Drawer
          title="主题管理"
          placement="right"
          onClose={this.onClose}
          maskClosable={true}
          closable={false}
          visible={this.state.showDrawer}
        >
          {
            classifyList.length === 0 ? <p>空空如也~~</p> :
            classifyList.map(item => 
            <Tag color="magenta" className="mb20 mr20" key={item.id}>{item.name}</Tag>
            )
          }
          <div className={styles.editTopic}>
          <Input value={editClassify} className="mt20 mb20" onChange={(e) => this.inputChange(e, 'editClassify')}/>
          <Button type="primary" onClick={this.addClassify}>增加分类</Button>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default withRouter(Edit);
// export default Edit
