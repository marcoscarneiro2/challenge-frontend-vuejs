import axios from "axios";

const api = axios.create({
  baseURL: "https://vue-flix-backend.herokuapp.com/",
  timeout: 60000
});

api.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
);

export default api;
