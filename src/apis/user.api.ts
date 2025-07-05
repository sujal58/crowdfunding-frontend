import { apiEndpoints } from "@/constant/api.constant";
import axiosInstance from "./axios.instance";
import type { AxiosResponse } from "axios";
import type { EKycStatus } from "@/enums";
import type { GetResponse } from "@/types";
import type { IUserResponse } from "@/interfaces/user.interface";

export const getAllUser = async():Promise<AxiosResponse<GetResponse<IUserResponse>>> =>{
    try { 
    const response = await axiosInstance.get(
        apiEndpoints.getAllUsersUrl
      );
  
      return response;
    } catch (error) {
        return Promise.reject(error)
    }
}

export const getAllUserByKycStatus = async(
    status:EKycStatus
):Promise<AxiosResponse<GetResponse<IUserResponse>>> =>{
    try { 
    const response = await axiosInstance.get(
        apiEndpoints.getUserByKycStatusUrl.concat(`?status=${status}`)
      );
  
      return response;
    } catch (error) {
        return Promise.reject(error)
    }
}