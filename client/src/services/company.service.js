import axios from 'axios';

const url = 'api/companies/';

class CompanyService {
    // Get Companies
    static async getCompanies() {
        const res = await axios.get(url);
        return res.data.data;
    }

    // Create Company
    static async createCompany(company) {
        const jwt = storage.getItem('jwt');
        const newCompany = await axios.post(url, company, { headers: { Authorization: 'Bearer ' + jwt } })
    }

    static updateCompany(company, id) {
        const jwt = storage.getItem('jwt');
        axios.put(url + id, company, { headers: { Authorization: 'Bearer ' + jwt } })
    }

    // Delete Company
    static deleteCompany(id) {
        const jwt = storage.getItem('jwt');
        axios.delete(url + id, company, { headers: { Authorization: 'Bearer ' + jwt } })
    }
}

export default CompanyService;