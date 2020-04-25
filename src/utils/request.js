import axios from 'axios'
import {
  MessageBox,
  Message
} from 'element-ui'
import store from '@/store'
import {
  getToken
} from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url

  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // console.log(config);

    if (store.getters.token) {
      // config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 20000) {
    //   Message({
    //     message: res.message || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

    //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     // to re-login
    //     MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
    //       confirmButtonText: 'Re-Login',
    //       cancelButtonText: 'Cancel',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()
    //       })
    //     })
    //   }
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    //   return res
    // }

    if (res.code == 0) {
      return res
    } else {
      Message({
        message: 'Error',
        type: 'error',
      })
    }

  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
    })
    return Promise.reject(error)
  }
)


// 请求方式的配置
export const postJsonRequest = (url, params, sign) => {
  return service({
    method: 'post',
    url: url,
    data: params,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
export const getRequest = (url, data = {}) => {
  return service({
    method: 'get',
    params: data,
    url: url,
  });
};
//	DELETE
export const deleteRequest = (url, data = {}) => {
  return service({
    method: 'delete',
    params: data,
    url: url,
  });
};
//PUT 更新、修改
export const putRequest = (url, data = {}) => {
  return service({
    method: 'put',
    data,
    url: url,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
//PATCH	是对 PUT 方法的补充，用来对已知资源进行局部更新 。
export const patchRequest = (url, data = {}) => {
  return service({
    method: 'patch',
    params: data,
    url: url,
  });
};
// 文件上传
export const postUploadFile = (url, params = {}) => {
  return service({
    method: 'post',
    url: url,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
// export default service
