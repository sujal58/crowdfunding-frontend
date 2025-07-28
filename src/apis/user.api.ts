import { apiEndpoints } from "@/constant/api.constant";
import axiosInstance from "./axios.instance";
import type { AxiosResponse } from "axios";
import type { EKycStatus } from "@/enums";
import type {
  GetResponse,
  GetSingleResponse,
  resetPasswordType,
} from "@/types";
import type { IUserResponse } from "@/interfaces/user.interface";

export const getAllUser = async (): Promise<
  AxiosResponse<GetResponse<IUserResponse>>
> => {
  try {
    const response = await axiosInstance.get(apiEndpoints.getAllUsersUrl);

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllUserByKycStatus = async (
  status: EKycStatus
): Promise<AxiosResponse<GetResponse<IUserResponse>>> => {
  try {
    const response = await axiosInstance.get(
      apiEndpoints.getUserByKycStatusUrl.concat(`?status=${status}`)
    );

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getCurrentUser = async (
  userId: string
): Promise<AxiosResponse<GetSingleResponse<IUserResponse>>> => {
  try {
    const response = await axiosInstance.get(
      apiEndpoints.getUserByIdUrl.concat(userId)
    );

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const forgotPassword = async (
  message: string,
  email: string,
  newPassword: string
): Promise<AxiosResponse<GetSingleResponse<String>>> => {
  try {
    const payload: resetPasswordType = {
      message,
      email,
      newPassword,
    };
    console.log(payload.email);
    const response = await axiosInstance.post(
      apiEndpoints.resetPasswordUrl,
      payload
    );

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const changePassword = async (
  message: string,
  email: string,
  oldPassword: string,
  newPassword: string
): Promise<AxiosResponse<GetSingleResponse<IUserResponse>>> => {
  try {
    const payload: resetPasswordType = {
      message,
      email,
      oldPassword,
      newPassword,
    };
    const response = await axiosInstance.post(
      apiEndpoints.resetPasswordUrl,
      payload
    );

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getKycStatusByUserId = async (
  userId: string
): Promise<AxiosResponse<GetSingleResponse<String>>> => {
  try {
    const response = await axiosInstance.get(
      apiEndpoints.getKycStatusByUserId.concat(`?userId=${userId}`)
    );

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};
