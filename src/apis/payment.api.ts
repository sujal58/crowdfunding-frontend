import { apiEndpoints } from "@/constant/api.constant";
import type {
  IPaymentIntentRequest,
  IPaymentIntentResponse,
  IPaymentVerificationResponse,
} from "@/interfaces/payment.interface";
import type { GetSingleResponse } from "@/types";
import axios, { type AxiosResponse } from "axios";
import axiosInstance from "./axios.instance";

export const InitiatePayment = async (
  payload: IPaymentIntentRequest
): Promise<AxiosResponse<GetSingleResponse<IPaymentIntentResponse>>> => {
  try {
    const response = await axios.post(apiEndpoints.initiatePayment, payload);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const verifyPayment = async (
  paymentIntent: string
): Promise<AxiosResponse<GetSingleResponse<IPaymentVerificationResponse>>> => {
  try {
    const response = axiosInstance.get(
      `http://localhost:8080/api/v1/payment/verify/${paymentIntent}`
    );
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};
