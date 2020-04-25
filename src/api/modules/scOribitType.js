import {
  getRequest,
  postJsonRequest,
  deleteRequest,
  putRequest
} from '../../utils/request'

const scOribitTypes = {
  getScOribitType(params = {}) {
    return getRequest('/api/scOrbitType/scOrbitTypes', params);
  },
  postScOribitType(params = {}) {
    return postJsonRequest('api/scOrbitType/scOrbitTypes', params);
  },
  deleteScOribitTypeId(params = {}) {
    return deleteRequest(`api/scOrbitType/scOrbitTypes/${params}`);
  },
  putScOribitTypeId(obj = {}) {
    return putRequest(`api/scOrbitType/scOrbitTypes/${obj.orbitId}`, obj);
  },
  getScOribitTypeId(params) {
    return getRequest(`api/scOrbitType/scOrbitTypes/${params}`);
  }
}
export default scOribitTypes;
