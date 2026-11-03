const state = {
  pile: []
}

const mutations = {
  add(state, payload) {
    state.pile.push({key: payload.key, text: payload.alert, type: payload.type})
  },
  remove
    (state, key) {
    if (state.pile.length > 0) {
      state.pile = state.pile.filter(item => item.key !== key)
    }
  }
}

const actions = {
  update({commit}, payload) {
    let key = Date.now();
    commit('add', {key: key, alert: payload.message, type: payload.type})
    setTimeout(() => {
      commit('remove', key)
    }, payload.time ? payload.time : 10000)
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
