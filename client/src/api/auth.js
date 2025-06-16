import axiosClient from "./axiosClient";

export const registerUser = (userData) => {
  return axiosClient.post("/user/register", userData);
};

export const loginUser = (userData) => {
  return axiosClient.post("/user/login", userData);
};

export const userProfile = () => {
  return axiosClient.get("/user/profile");
};
