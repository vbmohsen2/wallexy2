export const mutations = {
  add(state, payload) {
    if (state.bags.filter(bag => bag.pid === payload.product.id && (bag.model === payload.model.name || bag.model === 'single')).length > 0) {
      let target = state.bags.find(bag => bag.pid === payload.product.id && (bag.model === payload.model.name || bag.model === 'single'));
      if (payload.type === "پوستر") {
        if (payload.width === target.width && payload.height === target.height) {
          target.count += payload.count;
          return;
        }
      } else {
        target.count += payload.count;
        return;
      }
    }
    let bag = {
      count: payload.count,
      pid: payload.product.id,
      price: payload.model.price,
      name: payload.product.name,
      percent: payload.model.percent,
      width: payload.width,
      height: payload.height,
      max: payload.model.count,
      type: payload.type,
      model: payload.model.name,
      calculated: payload.model.calculated,
      photo: payload.product.photos.length === 0 ? '/content/logo.svg' : payload.product.photos[0].normal
    }
    state.bags.push(bag)
  },
  remove(state, index) {
    state.bags.splice(index, 1)
  },
  increase(state, index) {
    if (state.bags[index].count < state.bags[index].max) state.bags[index].count++;
  },
  decrease(state, index) {
    if (state.bags[index].count < 2) return;
    state.bags[index].count--;
  },
  update(state, bags) {
    if (state.bags.length > 0) state.bags.map(cookie => bags.find(server => server.pid === cookie.pid) ? bags.find(server => server.pid === cookie.pid) : bags.push(cookie))
    state.bags = bags;
    state.bags.map(bag => {
      bag.calculated = (bag.price - (bag.price * (bag.percent / 100))).toString()
      return bag;
    });
  },
  clear(state) {
    state.bags = [];
  },
  timer(state, time) {
    state.timer = time;
  },
};

export const state = {
  bags: [],
  timer: 0
}

export const getters = {
  bagsCount(state) {
    if (state.bags.length > 0) return state.bags.reduce((a, b) => ({count: a.count + b.count})).count;
    return 0;
  },
  totalCalculated(state) {
    let money = 0;
    state.bags.map(bag => {
      bag.width && bag.height && parseInt(bag.width) > 1 && parseInt(bag.height) > 1 ? money += bag.count * (bag.calculated * (bag.width / 100 * bag.height / 100)) : money += bag.count * bag.calculated
    })
    return money.toFixed();
  },
  totalPrice(state) {
    let money = 0;
    state.bags.map(bag => {
      bag.width && bag.height && parseInt(bag.width) > 1 && parseInt(bag.height) > 1 ? money += bag.count * (bag.price * (bag.width / 100 * bag.height / 100)) : money += bag.count * bag.price
    })
    return money.toFixed();
  }
};

export const actions = {
  async save({dispatch, state}) {
    await this.axios.post('/order', {bags: state.bags})
      .catch(() => dispatch('alerts/update', {message: 'مشکلی پیش آمده است , ما در حال رفع مشکل هستیم , لطفا صبور باشید .', type: 'error', time: 12000}, {root: true}))
  },
  add({commit, dispatch, state}, bag) {
    commit('timer', Date.now());
    commit('add', bag);
    setTimeout(function () {
      if (Date.now() > state.timer + 500) {
        dispatch('save');
      }
    }, 600);
  },
  remove({commit, dispatch}, index) {
    commit('remove', index);
    dispatch('save');
  },
  increase({commit, dispatch, state}, index) {
    commit('timer', Date.now());
    commit('increase', index);
    setTimeout(function () {
      if (Date.now() > state.timer + 500) {
        dispatch('save');
      }
    }, 600);

  },
  decrease({commit, dispatch, state}, index) {
    commit('timer', Date.now());
    commit('decrease', index);
    setTimeout(function () {
      if (Date.now() > state.timer + 500) {
        dispatch('save');
      }
    }, 600);
  },
  clear({commit}) {
    commit('clear');
  }
};


export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
