import type{ ISignupRequest, ILoginRequest, ISignupResponse, ILoginResponse } from "@/interfaces/auth.interface";
import { apiEndpoints } from "@/constant/api.constant";
import axiosInstance from "./axios.instance";
import type{ AxiosResponse } from "axios";


export const signup = async (
  payload: ISignupRequest,
): Promise<AxiosResponse<ISignupResponse>> => {
  try {
    const response = await axiosInstance.post(
      `${apiEndpoints.signupUrl}`,
      payload,
    );

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const signIn = async (
  payload: ILoginRequest,
): Promise<AxiosResponse<ILoginResponse>> => {
  try {
    const response = await axiosInstance.post(
      `${apiEndpoints.loginUrl}`,
      payload,
    );
    return response;
  } catch (error) {
    
    return Promise.reject(error);
  }
};