import axios from 'axios';
import { BACKEND_URL } from './http.service';
import { createBearerToken } from './auth.service';

export async function getTasks() {
  const respose = await axios.get(`${BACKEND_URL}/tasks`, createBearerToken());
  return respose.data;
}

export async function updateTaskStatusToDone(id) {
  const respose = await axios.patch(`${BACKEND_URL}/tasks/${id}/status`, { status: 'DONE' }, createBearerToken());
  return respose.data;
}

export async function createTask(data) {
  await axios.post(`${BACKEND_URL}/tasks`, data, createBearerToken());
}

export async function deleteTask(id) {
  await axios.delete(`${BACKEND_URL}/tasks/${id}`, createBearerToken());
}