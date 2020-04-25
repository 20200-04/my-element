import {
  getRequest,
  postJsonRequest,
  deleteRequest,
  putRequest
} from '../../utils/request'
const scApInfo = {
  getscApInfo(params = {}) {
    return getRequest('/api/ScApInfoList/ScApInfos', params);
  },
  postscApInfo(params = {}) {
    3
    return postJsonRequest('/api/ScApInfo/ScApInfos', params);
  },
  deletescApInfoId(params = {}) {
    return deleteRequest(`/api/ScApInfo/ScApInfos/${params},`);
  },
  putscApInfoId(obj = {}) {
    console.log(obj);

    return putRequest(`/api/ScApInfo/ScApInfos/${obj.apId}`, obj);
  },
  getscApInfoId(params) {
    return getRequest(`/api/ScApInfoList/ScApInfos/${params}`);
  },
}

export default scApInfo
