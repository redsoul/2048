import { createStore } from 'vuex';

import mutations from './mutations';
import state from './state';
import getters from './getters';
import actions from './actions';

export default createStore({
  state,
  mutations,
  getters,
  actions,
  modules: {
  },
});
