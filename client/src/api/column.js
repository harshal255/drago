import axiosClient from "./axiosClient";

export const getAllColumns = (boardId) => {
  return axiosClient.get(`/columns/get/${boardId}`);
};
