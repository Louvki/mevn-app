import axios from 'axios';

const url = 'api/register';

class RegisterService {
    static async register(firstName, lastName, email, password) {
        const res = await axios.post(url, { firstName, lastName, email, password })
        const token = res.data.data.token;
        localStorage.setItem('jwt', JSON.stringify(token));
    }
}


export default RegisterService;