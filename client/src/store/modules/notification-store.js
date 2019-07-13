const state = {
  notifications: [],
};

let nextId = 1;
const mutations = {
  PUSH(state, notification) {
    state.notifications.push({
      ...notification,
      id: nextId++,
    });
  },
  DELETE(state, notificationToRemove) {
    state.notifications = state.notifications.filter(
        (x) => x.id !== notificationToRemove.id
    );
  },
};

const actions = {
  add({commit}, notification) {
    commit('PUSH', notification);
  },
  remove({commit}, notificationToRemove) {
    commit('DELETE', notificationToRemove);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
