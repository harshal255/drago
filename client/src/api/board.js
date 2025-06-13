import axiosClient from "./axiosClient";

export const getAllBoards = () => {
  return axiosClient.get("/board/get");
};

export const addBoard = (data) => {
  return axiosClient.post("/board/create", data);
};

export const updateBoard = (data) => {
  return axiosClient.put("/board/update", data);
};

export const deleteBoard = (boardId) => {
  return axiosClient.delete(`/board/delete/${boardId}`);
};