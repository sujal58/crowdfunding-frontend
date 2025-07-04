import type { EKycStatus } from "@/enums";
import type { Role } from "@/types";

export interface IUserResponse {
    userId: number;
    email: string;
    name: string;
    username: string;
    country: string;
    city: string;
    kycStatus: EKycStatus; 
    roles: Role[]; 
    createdAt: string; 
    
  }

  export interface IGetUsersResponse {
    message: string;
    data: IUserResponse[];
    path: string;
    timestamp: string;
  }
  