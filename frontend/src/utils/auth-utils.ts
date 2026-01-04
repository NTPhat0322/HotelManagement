export const setRefreshToken = (token: string): void => {
  localStorage.setItem("REFRESHTOKEN", token);
};
export const getRefreshToken = (): string | null => {
  return localStorage.getItem("REFRESHTOKEN ");
};
export const setAccessToken = (token: string): void => {
  localStorage.setItem("ACCESSTOKEN", token);
};
export const getAccessToken = (): string | null => {
  return localStorage.getItem("ACCESSTOKEN");
};
export const removeAllToken = (): void => {
  localStorage.clear();
};
