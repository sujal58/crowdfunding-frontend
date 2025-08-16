import type {
  ICampaignRequest,
  ICampaignResponse,
} from "@/interfaces/campaign.interface";
import type { AxiosResponse } from "axios";
import { apiEndpoints } from "@/constant/api.constant";
import axiosInstance from "./axios.instance";
import type { ECampaignStatus } from "@/enums";
import type { GetResponse, GetSingleResponse } from "@/types";

export const createCampign = async (
  payload: ICampaignRequest
): Promise<AxiosResponse<ICampaignResponse>> => {
  try {
    const formData = new FormData();

    // 1. Append regular fields as individual parts (not nested)
    formData.append("title", payload.title);
    formData.append("description", payload.description);
    formData.append("goalAmount", payload.goalAmount.toString());
    if (payload.userId) formData.append("userId", payload.userId.toString());

    // 2. Append tags as multiple parts with same name
    payload.tags?.forEach((tag) => formData.append("tags", tag));

    // 3. Append campaign image (must be File object)
    if (payload.campaignImage instanceof File) {
      formData.append("campaignImage", payload.campaignImage);
    } else {
      console.error(
        "campaignImage is not a File object:",
        payload.campaignImage
      );
      throw new Error("campaignImage must be a File object");
    }

    // 4. Append supporting images (if any)
    if (payload.supportingImages) {
      payload.supportingImages.forEach((file, index) => {
        if (file instanceof File) {
          formData.append("supportingImages", file);
        } else {
          console.warn(`Skipping invalid file at index ${index}`);
        }
      });
    }

    const response = await axiosInstance.post(
      apiEndpoints.createCampaignUrl,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error creating campaign:", error);
    throw error;
  }
};

export const getAllCampaign = async (): Promise<
  AxiosResponse<GetResponse<ICampaignResponse>>
> => {
  try {
    const response = await axiosInstance.get(apiEndpoints.getAllCampaignsUrl);
    console.log(response);

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllCampaignByStatus = async (
  status: ECampaignStatus
): Promise<AxiosResponse<GetResponse<ICampaignResponse>>> => {
  try {
    const response = await axiosInstance.get(
      apiEndpoints.getCampaignByStatusUrl,
      {
        params: {
          status,
        },
      }
    );

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllCampaignByUser = async (): Promise<
  AxiosResponse<GetResponse<ICampaignResponse>>
> => {
  try {
    const response = await axiosInstance.get(apiEndpoints.getUserCampaignsUrl);

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const changeCampaignStatus = async (
  campaignId: number,
  status: ECampaignStatus
): Promise<AxiosResponse<GetSingleResponse<ICampaignResponse>>> => {
  try {
    const response = await axiosInstance.post(
      apiEndpoints.updateCampaignStatus.concat(
        `?campaignId=${campaignId}&status=${status}`
      )
    );

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};
