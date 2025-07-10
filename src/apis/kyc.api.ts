import type { EKycStatus } from "@/enums";
import type { IKycRequest, IKycResponse } from "@/interfaces/kyc.interface";
import type { GetSignleResponse, GetResponse } from "@/types";
import type { AxiosResponse } from "axios";
import axiosInstance from "./axios.instance";
import { apiEndpoints } from "@/constant/api.constant";



export const submitKyc = async(
    kyc:IKycRequest
):Promise<AxiosResponse<GetResponse<IKycResponse>>> =>{
        const formData = new FormData();
        try { 

            Object.entries(kyc).forEach(([key, value]) => {
                if (value instanceof File) {
                  formData.append(key, value);
                } else if (typeof value === 'object' && value !== null) {
                  formData.append(key, JSON.stringify(value));
                } else if (value !== undefined && value !== null) {
                  formData.append(key, value.toString());
                }
              });
            
        const response = await axiosInstance.post(
            apiEndpoints.submitKycUrl,
            formData,{
                headers:{
                    "Content-Type": 'multipart/form-data'
                }
            }
          );
      
          return response;
        } catch (error) {
            return Promise.reject(error)
        }
    }

export const changeKycStatusByAdmin = async(
    userId:number,
    status: EKycStatus
):Promise<AxiosResponse<GetResponse<IKycResponse>>> =>{
        try { 
        const response = await axiosInstance.post(
            apiEndpoints.changeKycStatusUrl.concat(`?userId=${userId}&status=${status}`)
          );
      
          return response;
        } catch (error) {
            return Promise.reject(error)
        }
    }

export const getKycByUserId = async(
      userId:string
    ):Promise<AxiosResponse<GetSignleResponse<IKycResponse>>> => {
      try {
        const response = await axiosInstance.get(
          apiEndpoints.getKycByUserIdUrl.concat(userId)
        )

        return response;
      } catch (error) {
        return Promise.reject(error)
      }
    }
