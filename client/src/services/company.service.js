import axios from 'axios';

const url = 'api/companies/';

class CompanyService {
    // Get Companies
    static async getCompanies() {
        const res = await axios.get(url);
        return res.data.data;
    }

    // Create Company
    static createCompany(company) {
        console.log(company);
        // TODO:
    }

    static updateCompany() {
        // TODO:
    }

    // Delete Company
    static deleteCompany() {
        // TODO:
    }
}

export default CompanyService;