import { BehaviorSubject } from 'rxjs';
import api from "../util/api";
import qs from 'qs';
import { history } from '../util/history';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('access_token')));

export const AuthenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserJwt() { return currentUserSubject.value },
    isAuthenticated() { return (this.currentUser != null && this.currentUserJwt != null) }
};

function login(username, password) {

    const grant_type = 'password';
    const data = qs.stringify({username, password, grant_type});
    const config = {
        auth: {
            username: 'elibrary-client',
            password: 'elibrary-secret'
        }
    };

    api.post('login', data, config)
    .then(res => {
        if (res.status === 200) {
            localStorage.setItem('access_token', JSON.stringify(res.data.access_token));
            currentUserSubject.next(res.data.access_token);
            history.push("/");
        }
    })
    .catch(error => {
        console.log("error", error);
    });
}

function logout() {
    localStorage.removeItem('access_token');
    currentUserSubject.next(null);
    history.push('/signin');
}