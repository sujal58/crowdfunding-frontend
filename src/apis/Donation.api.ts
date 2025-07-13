import type { GetResponse } from "@/types";
import type { AxiosResponse } from "axios";
import axiosInstance from "./axios.instance";
import { apiEndpoints } from "@/constant/api.constant";
import type { IDonationResponse } from "@/interfaces/donation.interface";

export const getAllDonationByUser = async():Promise<AxiosResponse<GetResponse<IDonationResponse>>> =>{
    try { 
    const response = await axiosInstance.get(
        apiEndpoints.getCurrentUserDonationsUrl
      );
  
      return response;
    } catch (error) {
        return Promise.reject(error)
    }
}