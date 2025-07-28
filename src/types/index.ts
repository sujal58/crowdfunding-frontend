import type { ECampaignStatus } from "@/enums";

export interface GetResponse<T> {
  message: string;
  data: T[];
  path: string;
  timestamp: string;
}

export interface GetSingleResponse<T> {
  message: string;
  data: T;
  path: string;
  timestamp: string;
}

export type Role = {
  id: number;
  name: string;
};

export type Campaign = {
  id: number;
  title: string;
  creator: string;
  email: string;
  goal: string;
  status: ECampaignStatus;
  submissionDate: string;
};

export type Fund = {
  id: number;
  campaign: string;
  campaigner: string;
  amount: string;
  releaseDate?: string;
  scheduledDate?: string;
  status: "Released" | "Pending" | "Held" | "Canceled";
};

export type resetPasswordType = {
  message: string;
  email: string;
  newPassword: string;
  oldPassword?: string;
};

export type UserOutletContextType = {
  doRefresh: () => void;
  refreshFlag: () => void;
};
