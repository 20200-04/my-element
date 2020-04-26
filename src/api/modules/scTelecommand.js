import {
  getRequest,
  postJsonRequest,
  deleteRequest,
  putRequest
} from '../../utils/request'

const scTeleCommands = {
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
    console.log(obj.paraId);
    return putRequest(`api/ScTeleCommand/ScTeleCommands/${obj.commandId}`, obj);
  },
  getScTeleCommandsId(params) {
    return getRequest(`api/ScTeleCommandList/ScTeleCommandLists/${params}`);
  }
}
export default scTeleCommands;
