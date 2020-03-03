import axios from "axios";
import { API_URL } from '../Constants.js';

class CountryService {

    addCountry(json) {
        return axios.put(`${API_URL}/api/addCountry/`, json, {}
        );
    }

<<<<<<< HEAD
    getCountryListAll() {
        return axios.get(`${API_URL}/api/getCountryListAll/`, {
        });
    }
    getCountryListActive() {
=======
    getCountryListAll(){
        return axios.get(`${API_URL}/api/getCountryListAll/`, {
        });
    }
    getCountryListActive(){
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
        return axios.get(`${API_URL}/api/getCountryListActive/`, {
        });
    }

    editCountry(json) {
<<<<<<< HEAD
        return axios.put(`${API_URL}/api/editCountry/`, json, {}
        );
    }

    getRealmCountryList() {
        return axios.get(`${API_URL}/api/getRealmCountryList/`, {
        });
    }
    getRealmCountryListByRealmId(realmId) {
        return axios.get(`${API_URL}/api/getRealmCountryListByRealmId/${realmId}`, {
        });
    }

=======
        return axios.put(`${API_URL}/api/editCountry/`,json,{}
            );
        }
    
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
}
export default new CountryService();