import type { GetResponse } from "@/types";
import type { AxiosResponse } from "axios";
import axiosInstance from "./axios.instance";
import { apiEndpoints } from "@/constant/api.constant";
import type { INotificationResponse } from "@/interfaces/notification.interface";

export const getNotificationByUser = async (): Promise<
  AxiosResponse<GetResponse<INotificationResponse>>
> => {
  try {
    const response = await axiosInstance.get(
      apiEndpoints.getUserNotificationsUrl
    );

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const changeNotificationStatus = async (
  notificationId: number,
  status: boolean
): Promise<AxiosResponse<GetResponse<INotificationResponse>>> => {
  const newStatus = status == true ? false : true;
  console.log(newStatus);
  try {
    const response = await axiosInstance.put(
      apiEndpoints.changeNotificationStatusUrl.concat(
        `/${notificationId}?read=${newStatus}`
      )
    );

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};
