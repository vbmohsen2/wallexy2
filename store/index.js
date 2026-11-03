import basket from './basket'
import alerts from './alerts'
import {createStore} from 'vuex'
import authentication from './authentication'

export default createStore({
  modules: {
    alerts,
    basket,
    authentication
  },
})
