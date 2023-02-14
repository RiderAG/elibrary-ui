import axios from 'axios';
import { AuthenticationService } from '../service/AuthenticationService';
import { history } from './history';

let instance = axios.create({
    baseURL: "http://localhost:3102/api",
    responseType: "json"
})

instance.interceptors.request.use(
    config => {
        if (config.auth != null) {
            console.log("Basic authorization");
            return config;
        }
        const token = AuthenticationService.currentUserJwt;
        if (token != null) {
            config.headers.authorization = `Bearer ${token}`;
        }
        // config.headers['Content-Type'] = 'application/json';
        return config;
    }, 
    error => {
        Promise.reject(error);
    }
);

instance.interceptors.response.use( 
    response => response,
    error => {
        const originalRequest = error.config;
     
        if (error.response.status === 401 && 
            originalRequest.url === 'http://localhost:3102/api/login') {
            history.push('/login');
            return Promise.reject(error);
        }

        if (error.response.status === 401 && !originalRequest._retry && originalRequest.auth == null) {
            AuthenticationService.deleteAccessToken();
            originalRequest._retry = true;
            return AuthenticationService.refreshToken(originalRequest);
        }
        return Promise.reject(error);
    }
);


export default instance;
    