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
<<<<<<< HEAD
     
   
=======
    //  const token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImVtYWlsIjoiZW1hbi4yMDM3NzM5MkBjb21waXQuYXVuLmVkdS5lZyIsInJvbGUiOiJpbnN0cnVjdG9yIiwicHVycG9zZSI6ImF1dGgiLCJpYXQiOjE3NDc5ODg5NjQsImV4cCI6MTc1MDU4MDk2NH0.T2azqMegTZeWubC5jqPqUf2FrqvpXTYo1V6COPNAwgk";
>>>>>>> e596fd36b286bc3b4f482ac95330939215a6ccbc
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
