import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL+'/auth/';

const register = (name, email, password) => {
  return axios.post(API_URL + "signup", {
    name,
    username:email,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const verifyAccount = (username, code) => {
  return axios
    .post(API_URL + "verify", {
      username,
      code,
    })
    .then((response) => {
      return response.data;
    });
};

const forgotPassword = (username) => {
  return axios
    .post(API_URL + "forgot-password", {
      username
    })
    .then((response) => {
      return response.data;
    });
};
const confirmPassword = (username, password, code) => {
  return axios
    .post(API_URL + "confirm-password", {
      username,
      password,
      code
    })
    .then((response) => {
      return response.data;
    });
};


const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
  verifyAccount,
  forgotPassword,
  confirmPassword
};
