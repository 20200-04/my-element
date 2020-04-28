import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const ScId = 'vue_admin_scid'

export function getToken() {
  return Cookies.get(TokenKey)
}
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getScId() {
  return Cookies.get(ScId)
}
export function setScId(scid) {
  return Cookies.set(ScId, scid)
}
