import {
  getScId,
  setScId
} from '@/utils/auth'
const state = {
  scid: getScId()
}

const mutations = {
  CHANGE_SCID: (state, scid) => {
    state.scid = scid
  }
}

const actions = {
  ChangeScId({
    commit
  }, scid) {
    console.log(scid);
    commit('CHANGE_SCID', scid)
    setScId(scid)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
