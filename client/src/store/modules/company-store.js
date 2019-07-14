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
  async getCompany({commit}, companyId) {
    const company = await CompanyService.getCompany(companyId)
    commit('SET_COMPANY', company);
    return company
  },
  async saveCompany({ commit }, company) {
    try {
      if (company._id === 'new') {
        const newCompany = await CompanyService.createCompany(company)
        commit('ADD_COMPANY', newCompany);
      } else {
        return CompanyService.updateCompany(company)
      }
    } catch (err) {
      throw new Error(err.response.data.message)
    }
  },
};

const mutations = {
  SET_COMPANIES(state, companies) {
    state.companies = companies;
  },
  SET_COMPANY(state, company) {
    state.company = company;
  },
  ADD_COMPANY(state, company) {
    state.companies.push(company);
  },
};


export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
