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
    switch (res.code) {
      case 401:
        message.error(res.message)
        console.log('就这啊')
        // RedirectComponent();
        window.location.href = '/login'
        return false;
      case 200:
        return res;
      default:
        message.error(res.message)
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
