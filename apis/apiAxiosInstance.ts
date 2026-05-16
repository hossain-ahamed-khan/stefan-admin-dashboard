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

export default axiosApiInstance;