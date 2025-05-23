import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    // const token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhaG1lZEBleGFtcGxlLmNvbSIsInJvbGUiOiJpbnN0cnVjdG9yIiwicHVycG9zZSI6ImF1dGgiLCJpYXQiOjE3NDc5NzgwNDYsImV4cCI6MTc1MDU3MDA0Nn0.cK7HxZKHA_aBfzBRURLV3xwyONenDUUPVEgX3pGsOUg";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized, logging out...");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
