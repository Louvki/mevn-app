import axios from 'axios';

const baseUrl = '/api/companies/';

class CompanyService {
    // Get Companies
    static async getCompanies() {
        const res = await axios.get(baseUrl);
        return res.data.data;
    }

    // Get Company
    static async getCompany(id) {
        if (!id) { throw new Error('Id required') }
        const res = await axios.get(baseUrl + id);
        return res.data.data;
    }

    // Create Company
    static async createCompany(company) {
        if (!company) { throw new Error('Company required') }
        const jwt = JSON.parse(localStorage.getItem('jwt'));
        await axios.post(baseUrl, company, { headers: { Authorization: jwt } })
    }

    // Update Company
    static async updateCompany(company, id) {
        if (!company) { throw new Error('Company required') }
        if (!id) { throw new Error('Id required') }
        const jwt = JSON.parse(localStorage.getItem('jwt'));
        const url = baseUrl + id;
        await axios.put(url, company, { headers: { Authorization: jwt } })
    }

    // Delete Company
    static async deleteCompany(id) {
        if (!id) { throw new Error('Id required') }
        const jwt = JSON.parse(localStorage.getItem('jwt'));
        const url = baseUrl + id;
      await axios.delete(url, { headers: { Authorization: jwt } })
    }

    // Get beneficial owners
    static async getBeneficialOwners(id) {
        if (!id) { throw new Error('Id required') }
        const url = baseUrl + id + '/invite';
        const res = await axios.get(url)
        return res.data.data;
    }

    // Add Beneficial owner
    static async addBeneficialOwner(email, id) {
        if (!email) { throw new Error('Email required') }
        if (!id) { throw new Error(' Id required') }
        const jwt = JSON.parse(localStorage.getItem('jwt'));
        const url = baseUrl + id + '/invite';

        await axios.post(url, { email }, { headers: { Authorization: jwt } })
    }
}

export default CompanyService;