import {
  getRequest,
  postJsonRequest,
  deleteRequest,
  putRequest
} from '../../utils/request'

const ScTeleCommands = {
  getScTeleCommandLists(params = {}) {
    return getRequest('/api/ScTeleCommandList/ScTeleCommandLists', params);
  },
  postScTeleCommands(params = {}) {
    return postJsonRequest('api/ScTeleCommand/ScTeleCommands', params);
  },
  deleteScTeleCommandsId(params = {}) {
    return deleteRequest(`api/ScTeleCommand/ScTeleCommands/${params}`);
  },
  putScTeleCommandsId(obj = {}) {
    return putRequest(`api/ScTeleCommand/ScTeleCommands/${obj.paraId}`, obj);
  },
  getScTeleCommandsId(params) {
    return getRequest(`api/ScTeleCommandList/ScTeleCommandLists/${params}`);
  }
}
export default ScTeleCommands;
