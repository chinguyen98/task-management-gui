import axios, { post } from 'axios';
import { BACKEND_URL } from './http.service';
import * as jwt from 'jsonwebtoken';

export async function signUp(data) {
  await post(`${BACKEND_URL}/auth/signup`, data);
}

export async function signIn(data) {
  const respose = await post(`${BACKEND_URL}/auth/signin`, data);
  return respose.data.accessToken;
}

export async function getTasks() {
  const respose = await axios.get(`${BACKEND_URL}/tasks`, createBearerToken());
  return respose.data;
}

export function decodeToken() {
  try {
    const token = localStorage.getItem('token');
    const value = jwt.verify(token, 'JSisAwesome');
    return value;
  } catch (err) {
    return null;
  }
}

export function createBearerToken() {
  const token = localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return config;
}
