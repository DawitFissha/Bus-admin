import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "https://melabus.herokuapp.com/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'getorganizationroute',  { headers: authHeader() });
  }
  getReservedSit() {
    return axios.get(API_URL + 'getreservedsit/6214d859b3778328889ce30a',  { headers: authHeader() });
  }
  getBusList() {
    return axios.get(API_URL + 'getallorganizationbus',  { headers: authHeader() });
  }

  getBookedList() {
    return axios.get(API_URL + 'bookedList', { headers: authHeader() });
  }
}

export default new UserService();
