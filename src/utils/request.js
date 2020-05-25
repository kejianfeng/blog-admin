import axios from 'axios'
import {message} from 'antd'

const service = axios.create({
  baseURL: '/api',
  timeout: 5000,
})

// request interceptor
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      message.error(res.message)
      return false
    } else {
      return res
    }
  },
  error => {
    return Promise.reject(error)
  }
)
const request = (url, method, params, option = {}) => {
  if (method === 'get') {
    option.params = params
  } else {
    option.data = params
  }
  return service({
    url,
    method,
    ...option
  })
}

export default request;
