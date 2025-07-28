export interface IPaymentIntentResponse {
  clientSecret: string;
}

export interface IPaymentIntentRequest {
  email: string;
  campaignId: number;
  amount: number;
  campaignName: string;
}

export interface IPaymentVerificationResponse {
  success: boolean;
  donationId: number;
  message: string;
}
