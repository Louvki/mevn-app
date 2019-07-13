import axios from 'axios';

const url = 'api/login';

class LoginService {
    static login(email, password) {
        axios.post(url, { email, password })
            .then(res => {
        console.log('fuck')
                console.log(res);
                // // login successful if there's a jwt token in the response
                // if (user.token) {
                //     // store user details and jwt token in local storage to keep user logged in between page refreshes
                //     localStorage.setItem('user', JSON.stringify(user));
                // }
            })
            .catch(err => {                
                console.log(err.response.data);
            })
    }

    static logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('user');
    }
}

export default LoginService;