export const mutations = {
  authenticate(state, bool) {
    state.authenticated = bool
  },
  showToken(state, bool) {
    state.showToken = bool
  },
  tokenIsValid(state, bool) {
    state.tokenIsValid = bool
  },
  user(state, user) {
    state.user = user
  },
  dialog(state, bool) {
    state.dialog = bool
  }
}

export const state = {
  user: null,
  dialog: false,
  showToken: false,
  tokenIsValid: true,
  authenticated: false,
}

export const actions = {
  async login({dispatch, commit}, payload) {
    this.axios.post('/auth/login', {
      number: payload.number,
    }).then(res => {
      if (res.status === 200) commit('showToken', true)
    }).catch(err => {
      if (err.response.status === 422) return dispatch('alerts/update', {message: err.response.data.errors[0].message, type: 'error'}, {root: true})
      else if (err.response.status === 403) return dispatch('alerts/update', {message: 'دسترسی شما به سایت مسدود شده است', type: 'error'}, {root: true})
      else return dispatch('alerts/update', {message: 'مشکلی پیش آمده است , ما در حال رفع مشکل هستیم , لطفا صبور باشید .', type: 'error'}, {root: true})
    })
  },

  async verify({state, dispatch, commit}, payload) {
    this.axios.post('/auth/verify', {
      number: payload.number,
      token: payload.token,
    }).then(async res => {
      if (res.status === 200) {
        commit('dialog', false)
        commit('user', res.data)
        commit('showToken', false)
        commit('authenticate', true)
        const bags = await this.axios.get('/profile/basket').then(res => res.data)
        commit('basket/update', bags , {root: true})
        await dispatch('basket/save', null, {root: true})
        await dispatch('alerts/update', {message: 'خوش آمدید کاربر عزیز', type: 'success'}, {root: true})
      }
    }).catch(err => {
      commit('tokenIsValid', false)
      if (err.response.status === 422) dispatch('alerts/update', {message: 'توکن منقضی شده است', type: 'error'}, {root: true})
      else if (err.response.status === 401) dispatch('alerts/update', {message: 'کد تایید صحیح نیست.', type: 'error'}, {root: true})
      else dispatch('alerts/update', {message: 'مشکلی پیش آمده است , ما در حال رفع مشکل هستیم , لطفا صبور باشید .', type: 'error'}, {root: true})
    })
  },

  async logout({commit}) {
    await this.axios.get('/auth/logout').then(() => {
      commit('authenticate', false)
      commit('basket/clear', [], {root: true})
    })
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}

