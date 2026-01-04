import type { User } from "../User";

export interface LoginRequest {
  username: string | null;
  password: string | null;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  city?: string;
  district?: string;
  ward?: string;
}
export interface RegisterRespond {
  isSuccess: boolean;
  data: {
    userId: string;
    accessToken: string;
    refreshToken: string;
  };
  message: string;
  error: string[];
}
