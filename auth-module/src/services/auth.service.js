import axios from "axios";
import { config } from "../appConfiig/config";

const REGISTER_API_URL = config.base_url + config.register 
const LOGIN_API_URL = config.base_url + config.login

const register = (name, email, password) => {
  return axios.post(REGISTER_API_URL, {
    data: {
      name: name,
      email: email,
      password: password,
    }
  })
  .then(response => {
    if (response.data.data && response.data.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data.data))
    }

    return response.data
  });
};

const login = (email, password) => {
  return axios
    .post(LOGIN_API_URL, {
      data: {
        email: email,
        password: password
      }
    })
    .then((response) => {
      if (response.data.data && response.data.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
      }

      return response.data
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
