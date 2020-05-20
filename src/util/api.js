import axios from 'axios';
import { AuthenticationService } from '../service/authentication';
import { history } from './history';

let instance = axios.create({
    baseURL: "http://localhost:3102/api",
    responseType: "json"
})

instance.interceptors.response.use( 
    response => response,
    error => {
        if (error.response.status === 401) {
            console.log("401");
            AuthenticationService.logout();
            history.push("/signin");
        }
        return error;
    }
);

export default instance;
    