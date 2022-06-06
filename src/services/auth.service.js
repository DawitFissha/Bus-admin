import axios from "axios";
import authHeader from './auth-header';
const API_URL = "https://melabus.herokuapp.com/";
axios.defaults.withCredentials = true
class AuthService {
  login(phonenumber, organizationcode, password) {
    return axios
      .post(API_URL + `loginorganizationuser`, {
        phonenumber,
        password, organizationcode
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        // console.log(response.data)
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("user");
  }
  addUser(newUser){
    return axios.post(`${API_URL}registerorganizationuser`,newUser, { headers: authHeader() })
  }

  addRoute(newRoute){
    return axios.post(`${API_URL}addroute`,newRoute, { headers: authHeader() })
  }
  addSchedule(newSchedule){
    return axios.post(`${API_URL}addschedule`,newSchedule, { headers: authHeader() })
  }
addBus(newBus){
    return axios.post(`${API_URL}registerbus`,newBus, { headers: authHeader() })
  }

  updateRouteInfo(source, destination, tarif, estimatedhour, distance, id) {
    console.log(`${source}`)
    return axios.put(API_URL + `updaterouteinfo/${id}`, {
      source,
      destination, tarif, estimatedhour, distance,
    }, { headers: authHeader() });
  }
  lockSit(sits) {
    console.log(sits)
    return axios.put(API_URL + `locksit/6214d859b3778328889ce30a`, {
      sits
    }, { headers: authHeader() });
  }
 
  updateBusInfo(busplateno, bussideno, driversuername, isactive, totalsit, id) {

    return axios.put(API_URL + `updateorganizationbus/${id}`, {
      busplateno,
      bussideno, driversuername, isactive, totalsit,
    }, { headers: authHeader() });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}
export default new AuthService();