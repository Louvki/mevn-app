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
        const res = await axios.get(baseUrl + id);
        return res.data.data;
    }

    // Create Company
    static async createCompany(company) {
        const jwt = JSON.parse(localStorage.getItem('jwt'));
        const res = await axios.post(baseUrl, company, { headers: { Authorization: jwt } });
        return res.data.data;
    }

    // Update Company
    static async updateCompany(company, id) {
        const jwt = JSON.parse(localStorage.getItem('jwt'));
        const url = baseUrl + id;
        const res = await axios.put(url, company, { headers: { Authorization: jwt } });
        return res.data.data;
    }

    // Delete Company
    static async deleteCompany(id) {
        const jwt = JSON.parse(localStorage.getItem('jwt'));
        const url = baseUrl + id;
        const res = await axios.delete(url, { headers: { Authorization: jwt } });
        return res.data.data;
    }

    // Get beneficial owners
    static async getBeneficialOwners(id) {
        const url = baseUrl + id + '/invite';
        const res = await axios.get(url);
        return res.data.data;
    }

    // Add Beneficial owner
    static async addBeneficialOwner(email, id) {
        const jwt = JSON.parse(localStorage.getItem('jwt'));
        const url = baseUrl + id + '/invite';
        const res = await axios.post(url, { email }, { headers: { Authorization: jwt } });
        return res.data.data;
    }
}

export default CompanyService;