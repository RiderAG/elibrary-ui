import { BehaviorSubject } from 'rxjs';
import api from "../util/api";
import qs from 'qs';
import { history } from '../util/history';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const clientId = 'elibrary-client';
const clientSecret = 'elibrary-secret';
const refreshTokenExpiration = 4 * 60 * 1000;

const currentUserSubject = new BehaviorSubject(cookies.get('access_token'));

export const AuthenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserJwt() { return currentUserSubject.value },
    refreshToken,
    deleteAccessToken,
    isAuthenticated
};

function login(username, password) {
    const grant_type = 'password';
    const data = qs.stringify({username, password, grant_type});
    const config = {
        auth: {
            username: clientId,
            password: clientSecret
        }
    };

    return api.post('login', data, config)
        .then(res => {
            if (res.status === 200) {
                setTokenCookies(res.data);
                history.push("/");
            }
        });
}

function refreshToken(originalRequest) {
    const grant_type = 'refresh_token';
    const refresh_token = cookies.get('refresh_token');
    if (refresh_token == null) {
        history.push("signin");
        return api(originalRequest);
    }
    const data = qs.stringify({grant_type, refresh_token});
    const config = {
        auth: {
            username: clientId,
            password: clientSecret
        }
    };
    return api.post('login', data, config)
        .then(res => {
            if (res.status === 200) {
                console.log("Refreshed successful");
                setTokenCookies(res.data);
                return api(originalRequest);
            }
        })
        .catch(error => {
            if (error.response.status === 401) {
                console.log("Refresh failed. Logout")
                logout();
            }
        });
}

function isAuthenticated() { 
    return ((this.currentUser != null && this.currentUserJwt != null) || cookies.get('refresh_token') != null) 
}

function logout() {
    cookies.remove('access_token');
    cookies.remove('refresh_token');
    currentUserSubject.next(null);
    history.push('/signin');
}

function setTokenCookies(data) {
    var expireDate = new Date();
    expireDate.setTime(expireDate.getTime() + 1000 * data.expires_in);
    cookies.set('access_token', data.access_token, {expires: expireDate, /*httpOnly: true*/});
    expireDate.setTime(expireDate.getTime() + refreshTokenExpiration);
    cookies.set('refresh_token', data.refresh_token, {expires: expireDate, /*httpOnly: true*/})
    currentUserSubject.next(data.access_token);
}

function deleteAccessToken() {
    currentUserSubject.next(null);
}