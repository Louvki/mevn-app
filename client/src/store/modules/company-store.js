import CompanyService from '../../services/company.service';

const state = {
  companies: [],
  company: {},
};

const actions = {
  getCompanies({ commit }) {
    return CompanyService.getCompanies()
      .then(companies => {
        commit('SET_COMPANIES', companies);
      })
  },
  async getCompany({ commit }, companyId) {
    const company = await CompanyService.getCompany(companyId)
    commit('SET_COMPANY', company);
    return company
  },
  async saveCompany({ commit }, company) {
    if (!this.state.auth.status.loggedIn) { throw new Error('You need to be logged in to create a company') }

    try {
      if (company._id === 'new') {
        const newCompany = await CompanyService.createCompany(company)
        commit('ADD_COMPANY', newCompany);
      } else {
        await CompanyService.updateCompany(company)
      }
    } catch (err) {
      throw new Error(err.response.data.message)
    }
  },
  async deleteCompany({ commit }, companyId) {
    if (!this.state.auth.status.loggedIn) { throw new Error('You need to be logged in to delete a company') }

    try {
      if (company._id === 'new') {
        const newCompany = await CompanyService.createCompany(company)
        commit('ADD_COMPANY', newCompany);
      } else {
        await CompanyService.updateCompany(company)
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
