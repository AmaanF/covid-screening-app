import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL+'/form';

const getAll = () => {
  return axios.get(API_URL + "/", { headers: authHeader() });
};


const getById = (id) => {
  return axios.get(API_URL + `/${id}`, { headers: authHeader() });
};

const create = (form) => {
  return axios
    .post(API_URL + "/", form)
    .then((response) => {
      return response;
    });
};


export default {
  getAll,
  getById,
  create,
};