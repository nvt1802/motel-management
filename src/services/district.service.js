import Axios from "axios"
// import { API_URL } from "../common/Constant"
const BASE_URL = 'https://vapi.vnappmob.com'

class DistrictAPI {
  findDistrictByProvinceId(provinceId) {
    return Axios.get(`${BASE_URL}/api/province/district/${provinceId}`)
  }
}

export default new DistrictAPI()