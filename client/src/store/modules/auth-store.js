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
        if (!firstName) { throw new Error('First Name required') }
        if (!lastName) { throw new Error('Last Name required') }
        if (!email) { throw new Error('Email required') }
        if (!password) { throw new Error('Password ID required') }


        try {
            await RegisterService.register(firstName, lastName, email, password)
            commit('SET_LOGGED_IN', true);
        } catch (err) {
            throw new Error(err.response ? err.response.data.message : err.message)
        }
    },
    async login({ commit }, { email, password }) {
        if (!email) { throw new Error('Email required') }
        if (!password) { throw new Error('Password ID required') }

        try {
            await LoginService.login(email, password);
            commit('SET_LOGGED_IN', true);
        } catch (err) {
            throw new Error(err.response ? err.response.data.message : err.message)
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
