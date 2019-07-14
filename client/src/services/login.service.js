import axios from 'axios';

const url = '/api/login';

class LoginService {

    // Gets token, puts in local storage
    static async login(email, password) {
            const res = await axios.post(url, { email, password })
            const token = res.data.data.token;
            localStorage.setItem('jwt', JSON.stringify(token));
    }

    // Removes JWT from local storage
    static logout() {
        localStorage.removeItem('jwt');
    }
}

export default LoginService;