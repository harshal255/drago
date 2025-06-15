import axiosClient from "./axiosClient";

export const getAllTasks = (columnId) => {
  return axiosClient.get(`/task/get/${columnId}`);
};

export const getAllTasksByBoardId = (boardId) => {
  return axiosClient.get(`/task/get?board_id=${boardId}`);
};

export const getTaskById = (taskId) => {
  return axiosClient.get(`/task/get/byid/${taskId}`);
};

export const addTask = (taskData) => {
  return axiosClient.post("/task/create", taskData);
};

export const updateTask = (taskData) => {
  return axiosClient.put("/task/update", taskData);
};

export const moveTask = (taskData) => {
  return axiosClient.patch("/task/move", taskData);
};

export const deleteTask = (taskId) => {
  return axiosClient.delete(`/task/delete/${taskId}`);
};
