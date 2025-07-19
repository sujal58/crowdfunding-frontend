export interface IPaymentIntentResponse {
  clientSecret: string;
}

export interface IPaymentIntentRequest {
  email: string;
  campaignId: number;
  amount: number;
}

export interface IPaymentVerificationResponse {
  success: boolean;
  donationId: number;
  message: string;
}
