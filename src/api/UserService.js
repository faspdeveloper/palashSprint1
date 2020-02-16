import axios from "axios";
import { API_URL } from '../Constants';


class UserService {
    getLanguageList() {
        return axios.get(`http://localhost:8081/api/getLanguageList`, {
        });
    }
    getRoleList() {
        return axios.get(`http://localhost:8081/api/getRoleList`, {
        });
    }
    getBusinessFunctionList() {
        return axios.get(`http://localhost:8081/api/getBusinessFunctionList`, {
        });
    }
    getRealmList() {
        return axios.get(`http://localhost:8081/api/getRealmList`, {
        });
    }
    addNewUser(json) {
        console.log(json);
        // var jsonString=JSON.stringify(json);

        return axios.put(`http://localhost:8081/api/addNewUser/`, json, {
        });
    }
    getUserList() {
        return axios.get(`http://localhost:8081/api/getUserList`, {
        });
    }
    getUserByUserId(userId) {
        return axios.get(`http://localhost:8081/api/getUserByUserId/${userId}`, {
        });
    }
    editUser(json) {
        return axios.put(`http://localhost:8081/api/editUser/`, json, {
        });
    }
    unlockAccount(user) {
        return axios.put(`http://localhost:8081/api/unlockAccount/`, user, {
        });
    }
    updateExpiredPassword(userId, oldPassword, newPassword) {
        return axios.post(`http://localhost:8081/api/updateExpiredPassword/`, { userId, oldPassword, newPassword }, {});
    }
    forgotPassword(username) {
        return axios.get(`http://localhost:8081/api/forgotPassword/${username}`,{});
    }
}

export default new UserService()