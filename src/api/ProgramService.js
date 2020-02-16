import axios from "axios"
import { API_URL } from '../Constants.js'

class ProgramService {
    getProgramData(programId) {
        console.log(programId)
        return axios.get(`${API_URL}/api/getProgramData?programId=${programId}`, {
        });
    }
}
export default new ProgramService()