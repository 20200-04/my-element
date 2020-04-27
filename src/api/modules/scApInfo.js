import {
    getRequest,
    postJsonRequest,
    deleteRequest,
    putRequest
  } from '../../utils/request'
  const scApInfo = {
    getscApInfo(params = {}){
      return getRequest('/api/ScApInfoList/ScApInfos', params);
    },
    postscApInfo(params = {}) {
      
      console.log(params);
  
      return postJsonRequest('/api/ScApInfo/ScApInfos', params);
    },
    deletescApInfoId(params = {}) {
      console.log(params)
      return deleteRequest(`/api/ScApInfo/ScApInfos/${params.scId}/${params.apId}`);
    },
    putscApInfoId(obj = {}) {
      console.log(obj);
      return putRequest(`/api/ScApInfo/ScApInfos/${obj.scId}/${Number(obj.apId)}`, obj)
    },
    getscApInfoId(params) {
      return getRequest(`/api/ScApInfoList/ScApInfos/${params}`);
    },
  }
  
  export default scApInfo
  