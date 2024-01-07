import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL+'/student';

const getAll = () => {
  return axios.get(API_URL + "/", { headers: authHeader() });
};


const getById = (id) => {
  return axios.get(API_URL + `/${id}`, { headers: authHeader() });
};

const getWithDetailsById = (id) => {
  return axios.get(API_URL + `/details/${id}`, { headers: authHeader() });
};

const create = (first_name, last_name, email, grade) => {
  return axios
    .post(API_URL + "/", {
      first_name,
      last_name,
      email,
      grade,
    },  { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const update = (id,first_name, last_name, email, grade) => {
  return axios
    .patch(API_URL + `/${id}`, {
      first_name,
      last_name,
      email,
      grade,
    },  { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const deleteById = (id) => {
  return axios.delete(API_URL + `/${id}`, { headers: authHeader() });
};



export default {
  getAll,
  getById,
  getWithDetailsById,
  create,
  update,
  deleteById
};