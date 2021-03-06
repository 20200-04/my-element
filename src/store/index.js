import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import tagsView from './modules/tagsView'
import permission from './modules/permission'
import user from './modules/user'
import sc from './modules/sc'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    sc,
    tagsView,
    permission
  },
  getters
})

export default store
