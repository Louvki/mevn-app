const state = {
  user: {id: '123ab', name: 'Annie Wilkens'},
};

const actions = {
  log() {
    console.log(state.user);
  },
};

export default {
  namespaced: true,
  state,
  actions,
};
