import { post } from 'axios';
import { BACKEND_URL } from './http.service';

export async function signUp(data) {
  await post(`${BACKEND_URL}/auth/signup`, data);
}

export async function signIn(data) {
  const respose= await post(`${BACKEND_URL}/auth/signin`, data);
  return respose.data.accessToken;
}
