import axios from 'axios';
import {BASE_URL} from '../config/axios-config';

const client = axios.create({
  baseURL: BASE_URL,
});

export const SignUp = (payload) => client.post(`/signup`, payload);
export const Login = (payload) => client.post(`/login`, payload);

const userLoginClientApi = {
  SignUp,
  Login,
};

export default userLoginClientApi;
