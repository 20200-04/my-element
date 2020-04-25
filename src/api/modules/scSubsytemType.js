import {
  getRequest,
  postJsonRequest,
  deleteRequest,
  putRequest
} from '../../utils/request'
const scSubsytemType = {
  getScSubsystemType(params = {}) {
    return getRequest('/api/scSubsystemType/scSubsystemTypes', params);
  },
  postScSubsystemType(params = {}) {

    console.log(params);

    return postJsonRequest('/api/scSubsystemType/scSubsystemTypes', params);
  },
  deleteScSubsystemTypeId(params = {}) {
    return deleteRequest(`/api/scSubsystemType/scSubsystemTypes/${params}`);
  },
  putScSubsystemTypeId(obj = {}) {
    console.log(obj);

    return putRequest(`/api/scSubsystemType/scSubsystemTypes/${obj.subsytemTypeId}`, obj);
  },
  getScSubsystemTypeId(params) {
    return getRequest(`/api/scSubsystemType/scSubsystemTypes/${params}`);
  },
}

export default scSubsytemType
