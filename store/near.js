/**
 * For nearprotocol Only
 */
import API from '@/api/API'
import '@/api/voting/near.js'
import { setToken, removeToken } from '../utils/auth'


// 初始化
export const state = () => ({
  account: null
})

export const mutations = {
  SET_BALANCE(state, data) {
    state.balances = data
  },
  SET_ACCOUNT(state, account) {
    state.account = account
  }
}

export const actions = {
  async fetchAccount({ commit }) {
    const account = window.walletConnection.getAccountId()
    commit('SET_ACCOUNT', account)
  },
  async isSignedIn() {
    const isSignedIn = window.walletConnection.isSignedIn()
    return isSignedIn
  },
  async testLogin() {
    const isSignedIn = window.walletConnection.isSignedIn()
    if (!isSignedIn) return
    try {
      const account = window.walletConnection.getAccountId()
      const res = await API.auth({
        platform: 'near',
        publickey: account
      })
      if (res.code === 0) {
        setToken(res.data)
        this._vm.$userMsgChannel.postMessage('login')
        return '签名登录成功，正在跳转'
      } else {
        throw Error('签名登录失败')
      }
    } catch (error) {
      console.error(`Error happened when signing ${error.toString()}`)
      throw error
    }
  },
  async login() {
    window.walletConnection.requestSignIn(
      this.nearConfig.contractName,
      'DAOJAM'
    )
  },
  logout() {
    return new Promise((resolve, reject) => {
      try {
        window.walletConnection.signOut()
        removeToken()
      } catch (error) {
        reject(error)
      }
      resolve()
    })
  }
}
