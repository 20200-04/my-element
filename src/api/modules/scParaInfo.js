// 遥测参数配置
import {
  getRequest,
  postJsonRequest,
  deleteRequest,
  putRequest
} from '../../utils/request'
const scParaInfo = {
  getScParaInfo(params = {}) {
    return getRequest('/api/ScParaInfoList/ScParaInfoLists', params);
  },
  postScParaInfo(params = {}) {
    return postJsonRequest('/api/ScParaInfo/ScParaInfos', params);
  },
  deleteScParaInfoId(params = {}) {
    return deleteRequest(`/api/ScParaInfo/ScParaInfos/${params}`);
  },
  putScParaInfoId(obj = {}) {
    return putRequest(`/api/ScParaInfo/ScParaInfos/${obj.paraId}`, obj);
  },
  getScParaInfoId(params) {
    return getRequest(`/api/ScParaInfoList/ScParaInfoLists/${params}`);
  },
}

export default scParaInfo
