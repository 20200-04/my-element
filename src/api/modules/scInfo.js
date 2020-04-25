// 基础信息配置
import {
  getRequest,
  postJsonRequest,
  deleteRequest,
  putRequest
} from '../../utils/request'
const scInfo = {
  getScInfo(params = {}) {
    return getRequest('/api/ScInfoList/ScInfo', params);
  },
  postScInfo(params = {}) {
    return postJsonRequest('/api/ScInfo/ScInfos', params);
  },
  deleteScInfoId(params = {}) {
    return deleteRequest(`/api/ScInfo/ScInfos/${params}`);
  },
  putScInfoId(obj = {}) {
    return putRequest(`/api/ScInfo/ScInfos/${obj.scId}`, obj);
  },
  getScInfoId(params) {
    return getRequest(`/api/ScInfo/ScInfos/${params}`);
  },
}

export default scInfo
