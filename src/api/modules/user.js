import {
  getToken
} from '@/utils/auth'
import {
  getRequest,
  postJsonRequest
} from '../../utils/request'
const BASE_URL = 'http://ceshi3.dishait.cn/api';
const USER = {
  getRoom(params = {}) {
    return getRequest(`${BASE_URL}/index_category/data`, params);
  },
  // 登录
  login(params = {}) {
    return postJsonRequest('/vue-admin-template/user/login', params);
  },
  // 获取用户信息
  getInfo(params = {}) {
    params.token = getToken()
    return getRequest('/vue-admin-template/user/info', params);
  },
  // 退出
  logout(params = {}) {
    return postJsonRequest('/vue-admin-template/user/logout', params);
  },
}
export default USER;
