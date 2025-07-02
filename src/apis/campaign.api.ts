import type { ICampaignRequest, ICampaignResponse } from "@/interfaces/campaign.interface";
import type { AxiosResponse} from "axios";
import { apiEndpoints } from "@/constant/api.constant";
import axiosInstance from "./axios.instance";



export const createCampign = async(
    payload:ICampaignRequest
):Promise<AxiosResponse<ICampaignResponse>> =>{
    console.log(payload);
   try {
     const formData = new FormData();

     //append regular field
     formData.append("title", payload.title);
     formData.append("description", payload.description);
     formData.append("goalAmount", payload.goalAmount.toString());
     formData.append("campaignImage", payload.campaignImage);
     if(payload.userId) formData.append("userId", payload.userId.toString())

    // Append tags array (as repeated fields)
    payload.tags?.forEach(tag => formData.append('tags', tag));
    

    // Append files
    payload.supportingImages?.forEach(file => formData.append('supportingImages', file));

    console.log(formData);
    
    const response = await axiosInstance.post(
        apiEndpoints.createCampaignUrl,
        formData,
      );
      console.log(response);
  
      return response;

   } catch (error) {
    return Promise.reject(error)
   }
}
  