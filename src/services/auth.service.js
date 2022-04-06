import axios from "axios";
import authHeader from './auth-header';
const API_URL = "https://melabus.herokuapp.com/";

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
        console.log(response.data)
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("user");
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
  addBusInfo(busplateno, bussideno, driversuername, isactive, totalsit) {

    return axios.post(API_URL + 'registerbus', {
      busplateno,
      bussideno, driversuername, isactive, totalsit,
    }, { headers: authHeader() }).then(response => { console.log(response.data) });
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