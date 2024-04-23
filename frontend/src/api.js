// All requests from the browser to the server, once called from their components are
// direceted to this 'interceptor' module
// Using axios, a library for making and HTTP requests, seems to be popular

import axios from "axios"; 
import { ACCESS_TOKEN } from "./constants";

// const apiUrl = "/choreo-apis/awbo/backend/rest-api-be2/v1.0";
// for deployment

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL //? import.meta.env.VITE_API_URL : apiUrl, for deployment 
});
// looks at the ENV file to find the URL to make requests too.



api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attaches token to the header of the request for authorizaiton
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;