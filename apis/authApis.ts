import { useQuery } from "@tanstack/react-query";
import axiosApiInstance from "./apiAxiosInstance";


export const login = async (credentials: { email: string; password: string }) => {
  try {
    const response = await axiosApiInstance.post("/auth/login/", credentials);
    return response.data;
  } 
  catch (error: any) {
    throw error.response?.data || error;
  }
};


export const ForgotPasswordRequest = async (resetData: { email: string }) => {
  try {
    const res = await axiosApiInstance.post("/auth/forgot-password/", resetData);
    return res.data;
  } 
  catch (error: any) {
    throw error.response?.data || error;
  }
};

export const verifyForgotPasswordOtp = async (otpData: { email: string; code: string; }) => {
  try {
    const response = await axiosApiInstance.post('/auth/forgot-password/verify/', otpData);
    return response.data;
  } 
  catch (error: any) {
    throw error.response?.data || error;
  }
};


export const resetForgotPasswordOtp = async (otpData: { email: string }) => {
  try {
    const response = await axiosApiInstance.post('/auth/resend-otp/', otpData);
    return response.data;

  } catch (error: any) {
    throw error.response?.data || error;
  }
};


export const resetNewPassword = async (resetPassword: { email: string, password: string, confirm_password: string}) => {
  try {
    const response = await axiosApiInstance.post("/auth/forgot-password/set/password/", resetPassword);
    return response.data;
  }
  catch (error: any) {
    throw error.response?.data || error;
  }
};


export const authLogout = () => {
  localStorage.removeItem("authToken");
};

export const getUserProfile = () => {
  const getData = async () => {
    const response = await axiosApiInstance.get("/user/profile/details/");
    return response.data;
  }

  const {
    data: userProfileData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["userProfileData"],
    queryFn: getData,
  });
  return { userProfileData, isLoading, isError, error, refetch };
}