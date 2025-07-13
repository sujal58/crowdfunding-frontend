import type { GetSingleResponse } from "@/types";
import type { AxiosResponse } from "axios";
import axiosInstance from "./axios.instance";
import { apiEndpoints } from "@/constant/api.constant";

export const generateAndSendOtp = async(
    email: string
):Promise<AxiosResponse<GetSingleResponse<String>>> =>{
    try { 
    const response = await axiosInstance.post(
        apiEndpoints.generateAndSendOtp.concat(`?email=${email}`)
      );
  
      return response;
    } catch (error) {
        return Promise.reject(error)
    }
}

export const verifyOtp = async(
    email: string,
    otp:String
):Promise<AxiosResponse<GetSingleResponse<String>>> =>{
    try { 
    const response = await axiosInstance.post(
        apiEndpoints.verifyOtp.concat(`?email=${email}&otp=${otp}`)
      );
  
      return response;
    } catch (error) {
        return Promise.reject(error)
    }
}