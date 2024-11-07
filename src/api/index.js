import axios from "axios";

const BASE_URL = process.env.REACT_APP_HOST;

const API = axios.create({ baseURL: BASE_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("utoken")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("utoken")}`;
  }
  return req;
});

export default API;
