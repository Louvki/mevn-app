import CompanyService from '../../services/company.service';

const state = {
  companies: [],
  company: {},
  beneficialOwners: [],
};

const actions = {
  // Get all companies
  async getCompanies({ commit }) {
    try {
      const companies = await CompanyService.getCompanies();
      commit('SET_COMPANIES', companies);
    } catch (err) {
      throw new Error(err.response ? err.response.data.message : err.message)
    }
  },

  // Get company
  async getCompany({ commit }, companyId) {
    if (!companyId) { throw new Error('Company ID required') }

    try {
      const company = await CompanyService.getCompany(companyId)
      commit('SET_COMPANY', company);
      return company
    } catch (err) {
      throw new Error(err.response ? err.response.data.message : err.message)
    }
  },

  // Save company. Depending on the company id either updates or creates a company.
  async saveCompany({ }, company) {
    if (!this.state.auth.status.loggedIn) { throw new Error('You need to be logged in to create a company') }
    if (!company) { throw new Error('Company required') }

    try {
      company._id === 'new'
        ? await CompanyService.createCompany(company)
        : await CompanyService.updateCompany(company)
      this.getCompanies();
    } catch (err) {
      throw new Error(err.response ? err.response.data.message : err.message)
    }
  },

  // Delete company
  async deleteCompany({ }, companyId) {
    if (!this.state.auth.status.loggedIn) { throw new Error('You need to be logged in to delete a company') }
    if (!companyId) { throw new Error('Company ID required') }
    if (companyId === 'new') { return; }

    try {
      await CompanyService.deleteCompany(companyId)
    } catch (err) {
      throw new Error(err.response ? err.response.data.message : err.message)
    }
  },

  // Add beneficial owner
  async addBeneficialOwner({ }, { email, id: companyId }) {
    if (!this.state.auth.status.loggedIn) { throw new Error('You need to be logged in to add beneficial owners') }
    if (!email) { throw new Error('Email required') }
    if (!companyId) { throw new Error('Company ID required') }

    try {
      await CompanyService.addBeneficialOwner(email, companyId);
      CompanyService.getBeneficialOwners(companyId);
    } catch (err) {
      throw new Error(err.response ? err.response.data.message : err.message)
    }
  },

  async getBeneficialOwners({ commit }, companyId) {
    if (!companyId) { throw new Error('Company ID required') }

    try {
      const owners = await CompanyService.getBeneficialOwners(companyId)
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
