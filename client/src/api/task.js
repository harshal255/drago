import axiosClient from "./axiosClient";

export const getAllTasks = (columnId) => {
  return axiosClient.get(`/task/get/${columnId}`);
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

export const deleteTask = (taskId) => {
  return axiosClient.delete(`/task/delete/${taskId}`);
};
