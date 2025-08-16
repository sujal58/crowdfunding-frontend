import type { GetSingleResponse } from "@/types";
import type { AxiosResponse } from "axios";
import axiosInstance from "./axios.instance";
import { apiEndpoints } from "@/constant/api.constant";
import type {
  IAdminDashboardDataResponse,
  IDashboardDataResponse,
} from "@/interfaces/dashboard.interface";

export const getDashboardData = async (): Promise<
  AxiosResponse<GetSingleResponse<IDashboardDataResponse>>
> => {
  try {
    const response = await axiosInstance.get(
      apiEndpoints.getuserDashboardDetails
    );

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAdminDashboardData = async (): Promise<
  AxiosResponse<GetSingleResponse<IAdminDashboardDataResponse>>
> => {
  try {
    const response = await axiosInstance.get(
      apiEndpoints.getAdminDashboardDetails
    );
    console.log(response);

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};
