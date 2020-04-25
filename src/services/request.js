import axios from "axios";
import store from "@/store";

const service = axios.create({});

service.interceptors.request.use(
  async config => {
    if (!store.getters.options.teamworkDomain)
      throw new Error("No teamwork domain provided");

    config.baseURL = store.state.options.teamworkDomain;
    if (store.getters.options.corsProxy) {
      config.baseURL = store.getters.options.corsProxy + config.baseURL;
    }
    config.headers = {
      Authorization: "Basic " + btoa(store.state.options.apiKey)
    };
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return Promise.reject(error);
  }
);

export const METHODS = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete"
};

export default service;
