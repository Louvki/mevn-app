import CompanyService from '../../services/company.service';

const state = {
  companies: [],
  company: {},
  beneficialOwners: [],
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
  async saveCompany({ }, company) {
    if (!this.state.auth.status.loggedIn) { throw new Error('You need to be logged in to create a company') }

    try {
      if (company._id === 'new') {
        CompanyService.createCompany(company)
      } else {
        await CompanyService.updateCompany(company)
      }
    } catch (err) {
      throw new Error(err.response ? err.response.data.message : err.message)
    }
  },
  async deleteCompany({ }, companyId) {
    if (!this.state.auth.status.loggedIn) { throw new Error('You need to be logged in to delete a company') }
    if (companyId === 'new') { return; }
    try {
      await CompanyService.deleteCompany(companyId)
    } catch (err) {
      throw new Error(err.response ? err.response.data.message : err.message)
    }
  },
  async addBeneficialOwner({ }, { email, id }) {
    if (!this.state.auth.status.loggedIn) { throw new Error('You need to be logged in to add beneficial owners') }
    try {
      await CompanyService.addBeneficialOwner(email, id);
      CompanyService.getBeneficialOwners(id);
    } catch (err) {
      throw new Error(err.response ? err.response.data.message : err.message)
    }
  },
  async getBeneficialOwners({ commit }, id) {
    try {
      const owners = await CompanyService.getBeneficialOwners(id)
      commit('SET_BENEFICIAL_OWNERS', owners);
    } catch (err) {
      throw new Error(err.response ? err.response.data.message : err.message)
    }
  }
};

const mutations = {
  SET_COMPANIES(state, companies) {
    state.companies = companies;
  },
  SET_COMPANY(state, company) {
    state.company = company;
  },
  SET_BENEFICIAL_OWNERS(state, beneficialOwners) {
    state.beneficialOwners = beneficialOwners;
  },
};


export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
