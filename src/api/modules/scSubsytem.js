// 卫星分系统配置
import {
  getRequest,
  postJsonRequest,
  deleteRequest,
  putRequest
} from '../../utils/request'

const scSubSytem = {
  getScSubSytem(params = {}) {
    return getRequest('/api/ScSubSytem/ScSubSytems', params);
  },
  postScSubSytem(params = {}) {
    return postJsonRequest('api/ScSubSystemConfig/ScSubSystemConfigs', params);
  },
  deleteScSubSytemId(params = {}) {
    return deleteRequest(`api/ScSubSystemConfig/ScSubSystemConfigs/${params}`);
  },
  putScSubSytemId(obj = {}) {
    return putRequest(`api/ScSubSystemConfig/ScSubSystemConfigs/${obj.subsytemId}`, obj);
  },
  getScSubSytemId(params) {
    return getRequest(`api/ScSubSytem/ScSubSytems/${params}`);
  }
}
export default scSubSytem;
