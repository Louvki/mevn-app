import LoginService from '../../services/login.service';
import RegisterService from '../../services/register.service';


// State
// If we have a jwt token we are logged in
const state = {
    status: { loggedIn: !!JSON.parse(localStorage.getItem('jwt')) }
}

// Actions
const actions = {
    async register({ commit }, { firstName, lastName, email, password }) {
        try {
            await RegisterService.register(firstName, lastName, email, password)
            commit('SET_LOGGED_IN', true);
        } catch (err) {
            throw new Error(err.response.data.message)
        }
    },
    async login({ commit }, { email, password }) {
        try {
            await LoginService.login(email, password);
            commit('SET_LOGGED_IN', true);
        } catch (err) {
            throw new Error(err.response.data.message)
        }
    },
    logout({ commit }) {
        LoginService.logout();
        commit('SET_LOGGED_IN', false);
    }
}

// Mutations
const mutations = {
    SET_LOGGED_IN(state, loggedIn) {
        state.status = { loggedIn };
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
};
