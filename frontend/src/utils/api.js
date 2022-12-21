import axios from "axios";
import { apiUrl } from "../constants/api";
const api = axios.create({
  baseURL: apiUrl,
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        Object.assign(config.headers, {
          Authorization: `Bearer ${user.token}`,
        });
      }
    } catch {
      // An error occured whiles parsing json
    }

    return config;
  },
  (error) => Promise.reject(error)
);
export default api;
