import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user-store.js';
import auth from './modules/auth-store.js';
import company from './modules/company-store.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    company,
    user,
  },
});
