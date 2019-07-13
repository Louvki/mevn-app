import LoginService from '../../services/login.service';


// State
const user = JSON.parse(localStorage.getItem('user'));
const state = user ? { status: { loggedIn: true }, user } : { status: {}, user: null };

// Actions
const actions = {
    login({ dispatch, commit }, { username, password }) {
        commit('LOGIN', { username });

        LoginService.login(username, password)
            .then(
                user => {
                    commit('LOGIN_SUCCESS', user);
                    // router.push('/');
                },
                error => {
                    commit('LOGIN_FAIL', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
    logout({ commit }) {
        LoginService.logout();
        commit('LOGOUT');
    }
}

// Mutations
const mutations = {
    LOGIN(state, user) {
        state.status = { loggingIn: true };
        state.user = user;
    },
    LOGIN_SUCCESS(state, user) {
        state.status = { loggedIn: true };
        state.user = user;
    },
    LOGIN_FAIL(state) {
        state.status = {};
        state.user = null;
    },
    LOGOUT(state) {
        state.status = {};
        state.user = null;
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
};
