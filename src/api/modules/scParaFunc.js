import {
  getRequest,
  postJsonRequest,
  deleteRequest,
  putRequest
} from '../../utils/request'

const scParaFunc = {
  getScParaFunc(params = {}) {
    return getRequest('/api/scParaFunc/paraFunc', params);
  },
  postScParaFunc(params = {}) {
    console.log(params);

    return postJsonRequest('api/scParaFunc/paraFunc', params);
  },
  deleteScParaFuncId(params = {}) {
    return deleteRequest(`api/scParaFunc/paraFunc/${params}`);
  },
  putScParaFuncId(obj = {}) {
    console.log(obj);
    return putRequest(`api/scParaFunc/paraFunc/${obj.funcId}`, obj);
  },
  getScParaFuncId(params) {
    return getRequest(`api/scParaFunc/paraFunc/${params}`);
  }
}
export default scParaFunc;
