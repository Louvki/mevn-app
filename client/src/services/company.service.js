import axios from 'axios';

const url = 'api/companies/';

class CompanyService {
    // Get Companies
    static async getCompanies() {
        const res = await axios.get(url);
        return res.data.data;
    }

    // Get Company
    static async getCompany(id) {
        const res = await axios.get(url + id);
        return res.data.data;
    }

    // Create Company
    static async createCompany(company) {
        const jwt = localStorage.getItem('jwt');
        const newCompany = await axios.post(url, company, { headers: { Authorization: 'Bearer ' + jwt } })
        return newCompany;
    }

    // Update Company
    static async updateCompany(partialCompany, id) {
        const jwt = localStorage.getItem('jwt');
        const companyId = await axios.put(url + id, partialCompany, { headers: { Authorization: 'Bearer ' + jwt } })
        return companyId;
    }

    // Delete Company
    static async deleteCompany(id) {
        const jwt = localStorage.getItem('jwt');
        const companyId = await axios.delete(url + id, { headers: { Authorization: 'Bearer ' + jwt } })
        return companyId;
    }
}

export default CompanyService;