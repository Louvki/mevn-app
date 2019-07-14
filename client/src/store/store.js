import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth-store';
import company from './modules/company-store';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    company,
  },
});
