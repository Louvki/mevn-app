import CompanyService from '../../services/company.service';

const state = {
  companies: [],
  company: {},
};

const actions = {
  fetchCompanies({ commit }) {
    return CompanyService.getCompanies()
      .then(companies => {
        commit('SET_COMPANIES', companies);
      })
  },
  getCompany(companyId) {
    return state.companies.find((e) => e.id === companyId);
  },
  createCompany({ dispatch }, company) {
    return CompanyService.createCompany(company)
      .then(() => {
        const notification = {
          type: 'success',
          message: 'Company added successfully!',
        };
        dispatch('notification/add', notification, { root: true });
      })
      .catch((e) => {
        const notification = {
          type: 'error',
          message: 'Failed to add company: ' + e.message,
        };
        dispatch('notification/add', notification, { root: true });
        throw e;
      });
  }
};

const mutations = {
  SET_COMPANIES(state, companies) {
    state.companies = companies;
  },
  ADD_COMPANY(state, company) {
    state.companies.push(company);
  },
  SET_COMPANY(state, company) {
    state.company = company;
  },
};


export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
