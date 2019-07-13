import LoginService from '../../services/login.service';
import RegisterService from '../../services/register.service';
import router from '../../router';


// State
// If we have a jwt token we are logged in
const state = {
    status: { loggedIn: !!JSON.parse(localStorage.getItem('jwt')) }
}

// Actions
const actions = {
    register({ commit }, { firstName, lastName, email, password }) {
        RegisterService.register(firstName, lastName, email, password)
            .then(() => {
                commit('LOGIN_SUCCESS');
                router.push('/');
            })
            .catch(err => {
                console.log(err.response);
            })
    },
    login({ commit }, { email, password }) {
        LoginService.login(email, password)
            .then(() => {
                commit('LOGIN_SUCCESS');
                router.push('/');
            })
            .catch(err => {
                console.log(err.response);
            })
    },
    logout({ commit }) {
        LoginService.logout();
        commit('LOGOUT');
    }
}

// Mutations
const mutations = {
    LOGIN_SUCCESS(state) {
        state.status = { loggedIn: true };
    },
    LOGOUT(state) {
        state.status = { loggedIn: false };
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
};
