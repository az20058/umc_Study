import axios from "axios";

const API_URL = "http://localhost:3000/todo"; // 서버 주소

export const fetchTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addTask = async (newTask) => {
  const response = await axios.post(API_URL, newTask);
  return response.data;
};

export const toggleTaskCheck = async ({ id, checked }) => {
  const response = await axios.patch(`${API_URL}/${id}`, {
    checked: checked, // 상태 반전
  });
  return response.data;
};

export const updateTask = async (id, title, content) => {
  const response = await axios.patch(`${API_URL}/${id}`, {
    title,
    content,
  });
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const fetchTaskById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data; // 성공 시 데이터 반환
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch task");
  }
};
