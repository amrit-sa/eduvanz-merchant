import axios from "axios";

const API_URL = process.env.REACT_APP_API_URI;

class AuthService {
  login(getData) {
    return axios
      .post(API_URL + "merchat_mobile_login", getData)
      .then((response) => {
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.clear();
  }

  register(getData) {
    return axios.post(API_URL + "register", getData);
  }

  post(givenData, Url) {
    return axios
      .post(API_URL + Url, givenData)
      .then((response) => {
       // console.log('response', response);
        return response.data;
      });
  }
}

export default new AuthService();
