import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL || "http://localhost:5000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("[axios] request failed:", error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosClient;