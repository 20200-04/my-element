import {
  getRequest,
} from '../../utils/request'

const TABLE = {
  // 获取用列表
  getTable(params = {}) {
    return getRequest('/vue-admin-template/table/list', params);
  },
  getList(params = {}) {
    return getRequest(`/api/index_category/${params}/data/1`);
  }
}
export default TABLE;
