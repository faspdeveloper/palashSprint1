import axios from 'axios'
import { Online } from "react-detect-offline";
import jwt_decode from 'jwt-decode'
import { API_URL } from '../../Constants.js'
import CryptoJS from 'crypto-js'
import { SECRET_KEY } from '../../Constants.js'

class AuthenticationService {

    isUserLoggedIn() {
        let user = localStorage.getItem('userId');
        if (user === null) return false
        return true
    }
    getLoggedInUserId() {
        let token = localStorage.getItem('token');
        var decoded = jwt_decode(token);
        return decoded.userId;
    }

    getLoggedInUsername() {
        let token = localStorage.getItem('token');
        var decoded = jwt_decode(token);
        return decoded.sub;
    }

    getLanguageId() {
        let token = localStorage.getItem('token');
        var decoded = jwt_decode(token);
        return decoded.user.language.languageId;
    }

    checkTypeOfSession() {
        let typeOfSession = localStorage.getItem('typeOfSession');
        console.log("typeofsession---" + typeOfSession);
        console.log("network----" + navigator.onLine);
        if ((typeOfSession === 'Online' && navigator.onLine) || (typeOfSession === 'Offline' && !navigator.onLine)) {
            console.log("true");
            return true;
        } else {
            console.log("false");
            return false;



        }
    }

    checkIfDifferentUserIsLoggedIn(newUsername) {
        console.log("token username---" + newUsername);
        let usernameStored = localStorage.getItem('username');
        console.log("usernameStored---"+usernameStored);
        if (usernameStored !== null && usernameStored !== "") {
            var usernameDecrypted = CryptoJS.AES.decrypt(usernameStored, `${SECRET_KEY}`)
            var originalText = usernameDecrypted.toString(CryptoJS.enc.Utf8);
            console.log("usernameDecrypted---" + originalText);
            if (originalText !== newUsername) {
                if (window.confirm("Are you sure you want to overrride already logged in user's details?")) {
                    return true;
                } else {
                    return false;
                }
            }
            return false;
        } else {
            return true;
        }
    }

    checkIfTokenExpired() {
        let token = localStorage.getItem('token');
        var decoded = jwt_decode(token);
        console.log(decoded);
        let tokenExpiryTime = new Date(decoded.exp * 1000);
        var curDate = new Date();
        console.log(new Date(decoded.exp * 1000));
        console.log("cur date---" + curDate);

        if (new Date(decoded.exp * 1000) > new Date()) {
            console.log("Token not expired");
            return true;
        } else {
            console.log("Token expired");
            return false;
        }
    }

    checkSessionTimeOut() {
        let token = localStorage.getItem('token');
        var decoded = jwt_decode(token);
        console.log("decoded---", decoded);
        console.log("Session expires on---" + decoded.user.sessionExpiresOn);
        return decoded.user.sessionExpiresOn;
    }

    refreshToken() {
        let token = localStorage.getItem('token');
        console.log("token---" + token);
        this.setupAxiosInterceptors();
        return axios.get(`${API_URL}/refresh`, {}).then(response => {
            console.log("response----------------", response)
        }).catch(
            error => {
                console.log("error----------", error);
            })
    }

    setupAxiosInterceptors() {
        //console.log("Inside interceptor setup");
        let token = localStorage.getItem('token');
        let basicAuthHeader = 'Bearer ' + token
        console.log("headers=" + basicAuthHeader);
        axios.interceptors.request.use(
            // if (this.isUserLoggedIn) {
            (config) => {
                config.headers.authorization = basicAuthHeader
                return config;
            }
            // }
        )

    }
}


export default new AuthenticationService()