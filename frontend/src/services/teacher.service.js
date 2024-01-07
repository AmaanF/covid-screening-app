import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL + '/teacher';

const getAll = () => {
  return axios.get(API_URL + "/", { headers: authHeader() });
};

const getById = (id) => {
  return axios.get(API_URL + `/${id}`, { headers: authHeader() });
};

const create = (email, password) => {
  return axios
    .post(API_URL + "/", {
      email,
      password,
    }, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const update = (id, email, password) => {
  return axios
    .patch(API_URL + `/${id}`, {
      email,
      password,
    }, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};


export default {
  getAll,
  getById,
  create,
  update,
};