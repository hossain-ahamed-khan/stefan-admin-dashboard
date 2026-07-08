"use client"
import axios from "axios";

const axiosApiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

axiosApiInstance.interceptors.request.use((config) => {
  const authToken =  localStorage.getItem("authToken")
  // console.log(authToken, "authToken")

  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

// Response Interceptor
axiosApiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Token expired or invalid
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");

      // Prevent redirect loop
      if (window.location.pathname !== "/admin-login") {
        window.location.href = "/admin-login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosApiInstance;