// 卫星类型
import {
  getRequest,
  postJsonRequest,
  deleteRequest,
  putRequest
} from '../../utils/request'
const scType = {
  getScType(params = {}) {
    return getRequest('/api/scType/scTypes', params);
  },
  postScType(params = {}) {
    return postJsonRequest('/api/scType/scTypes', params);
  },
  deleteScTypeId(params = {}) {
    return deleteRequest(`/api/scType/scTypes/${params}`);
  },
  putScTypeId(obj = {}) {
    return putRequest(`/api/scType/scTypes/${obj.typeId}`, obj);
  },
  getScTypeId(params) {
    return getRequest(`/api/scType/scTypes/${params}`);
  },
}

export default scType
