import { apiEndpoints } from "@/constant/api.constant";
import axiosInstance from "./axios.instance";
import type { IGetUsersResponse } from "@/interfaces/user.interface";
import type { AxiosResponse } from "axios";
import type { EKycStatus } from "@/enums";

export const getAllUser = async():Promise<AxiosResponse<IGetUsersResponse>> =>{
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
):Promise<AxiosResponse<IGetUsersResponse>> =>{
    try { 
    const response = await axiosInstance.get(
        apiEndpoints.getUserByKycStatusUrl.concat(`?status=${status}`)
      );
  
      return response;
    } catch (error) {
        return Promise.reject(error)
    }
}