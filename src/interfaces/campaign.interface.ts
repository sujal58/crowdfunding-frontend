export interface ICampaignRequest {
  title: string;
  description: string;
  goalAmount: number;
  tags?: string[];
  category?: string;
  campaignImage: File;
  supportingImages?: File[];
  userId?: number;
}

export interface ICampaignResponse {
  id: number;
  title: string;
  description: string;
  goalAmount: number;
  currentAmount: number;
  status: string;
  createdAt: string;
  userId: number;
  username: string;
  campaignImage: string;
}
