export const tokenService = {
  setAccessToken(accessToken: string) {
    localStorage.setItem("ACCESSTOKEN", accessToken);
  },
  setRefreshToken(refreshToken: string) {
    localStorage.setItem("REFRESHTOKEN", refreshToken);
  },
  getAccessToken(): string | null {
    return localStorage.getItem("ACCESSTOKEN");
  },
  getRefreshToken(): string | null {
    return localStorage.getItem("REFRESHTOKEN");
  },
  clearToken(): void {
    localStorage.removeItem("ACCESSTOKEN");
    localStorage.removeItem("REFRESHTOKEN");
    localStorage.removeItem("userName");
  },
  hasTokens(): boolean {
    return !!this.getAccessToken() && !!this.getRefreshToken();
  },
};
