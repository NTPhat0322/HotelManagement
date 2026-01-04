import axios from "axios";
import { tokenService } from "./token.service";
import type { LoginResponse, RegisterRespond } from "../types/login/login";
import type { User } from "../types/User";
import { authorizeAxiosInstance } from "../utils/authorizeAxios";
const API_URL = "http://localhost:5001/api";
export const authService = {
  async login(username: string, password: string): Promise<LoginResponse> {
    const res = await axios.post(`https://dummyjson.com/auth/login`, {
      username,
      password,
      expiresInMins: 1,
    });
    if (!res) {
      throw new Error("Lỗi không thể đăng nhập được. Vui lòng thử lại sau.");
    }
    tokenService.setAccessToken(res.data.accessToken);
    tokenService.setRefreshToken(res.data.refreshToken);
    localStorage.setItem("userName", res.data.username);
    return res.data;
  },

  async register(user: User): Promise<RegisterRespond> {
    const res = await axios.post(`${API_URL}/auth/register`, {
      user,
    });
    const data = res.data;
    if (!res.data.isSuccess) {
      throw new Error(res.data.message || "Đăng ký thất bại");
    }
    tokenService.setAccessToken(res.data.accessToken);
    tokenService.setRefreshToken(res.data.refreshToken);
    localStorage.setItem("userID", data.userID);
    return res.data;
  },

  async refreshToken(): Promise<{ accessToken: string }> {
    const refreshToken = tokenService.getRefreshToken();
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }
    const res = await axios.post(`https://dummyjson.com/auth/refresh`, {
      refreshToken,
    });
    const data = res.data;
    // const finalRefreshToken = data.refreshToken ?? refreshToken;
    tokenService.setAccessToken(data.accessToken);
    tokenService.setRefreshToken(data.refreshToken);

    return res.data;
  },

  async logout() {
    // try {
    //   const refreshToken = tokenService.getRefreshToken();
    //   if (refreshToken) {
    //     await axios.post(`${API_URL}/auth/logout`, { refreshToken });
    //   }
    // } catch (error) {
    //   console.error("Logout API call failed:", error);
    // } finally {
    // Luôn clear token và localStorage dù API có lỗi
    tokenService.clearToken();
    localStorage.clear();
    // }
  },

  async getCurrentUser() {
    const accessToken = tokenService.getAccessToken(); // Lấy token từ localStorage

    if (!accessToken) {
      throw new Error("Không tìm thấy token");
    }

    // Dùng authorizeAxiosInstance → TỰ ĐỘNG refresh khi token hết hạn
    const res = await authorizeAxiosInstance.get(
      "https://dummyjson.com/auth/me"
    );

    return res.data;
  },
};
