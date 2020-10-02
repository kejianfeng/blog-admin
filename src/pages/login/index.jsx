import React from 'react'
import { Form, Input, Button, message } from "antd";
import styles from "./index.module.scss";
import request from "../../utils/request";



const FormItem = Form.Item;

const Login = (props) => {
  const onFinish = async (params) => {
    const result = await request('/admin/login', "post", params);
    if (result.code === 200) {
      message.success('登录成功')
      props.history.push('/')
    } else {
      message.success('登录失败')
    }
  };
  return (
  <div className={styles.login_container}>
    <Form className={styles.login_form}
      initialValues={
        {
          userName:'',
          password: ''
        }
      }
      onFinish={onFinish}
    >
      <FormItem 
        name="userName"
        className="mt70"
        rules={[{ required: true, message: '账号名不能缺!' }]}
      >
        <Input placeholder="外星总部地址"/>
      </FormItem>
      <FormItem 
         name="password"
         rules={[{ required: true, message: '密码不能缺!' }]}
      >
        <Input placeholder="铭文"/>
      </FormItem>
      <FormItem>
        <Button  type="primary" style={{width:'100%', marginBottom:'30px'}} htmlType="submit">登录</Button>
      </FormItem>
    </Form>
  </div>
  )

}

export default Login