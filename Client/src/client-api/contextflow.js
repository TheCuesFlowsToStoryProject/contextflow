import axios from 'axios';
import {BASE_URL} from '../config/axios-config';

const client = axios.create({
  baseURL: BASE_URL,
});

export const saveContextFlow = (payload) => client.post(`/context`, payload);
export const getAllContextFlow = () => client.get(`/contexts`);
export const updateContextFlowById = (payload) =>
  client.put(`/add-module-entity`, payload);
// export const deleteContextFlowById = (payload) =>
//   client.delete('/contextflow/delete', {data: payload});

const ContextFlowClientApi = {
  getAllContextFlow,
  saveContextFlow,
  updateContextFlowById,
  //   deleteContextFlowById,
};

export default ContextFlowClientApi;
