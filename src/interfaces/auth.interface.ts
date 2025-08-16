export interface ISignupRequest {
    name: string;
    email: string;
    username: string;
    password: string;
    city?: string | null;
    country?: string;
    roles: string[];
  }

export interface ILoginRequest {
    email_username: string;
    password: string;
  }

  export interface ISignupResponse {
    status: number;
    message: string;
  }

  export interface ILoginResponse{
    data:{
      userId: string;
      token:string;
      roles:string[];
      status:string
    }
  }