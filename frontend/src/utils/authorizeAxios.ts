import axios from "axios";

export const authorizeAxiosInstance = axios.create({
  timeout: 1000 * 60 * 10, // 10 minutes
  withCredentials: true,
});
