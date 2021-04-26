import axios from "axios";
import { BASE_URL } from "../config/axios-config";

const client = axios.create({
  baseURL: BASE_URL,
});

export const saveContextFlow = (payload) => client.post(`/context`, payload);
export const saveContextType = (payload) =>
  client.post(`/context-type`, payload);
export const getAllContextFlow = (payload) =>
  client.get(`/contexts`, { params: { payload } });
export const updateContextFlowById = (payload) =>
  client.put(`/add-module-entity`, payload);
export const updateContextFlowByDrag = (payload) =>
  client.put(`/shuffle-entity`, payload);
export const removeAttentionEntities = (payload) =>
  client.put(`/remove-attention`, payload);
export const changeContextById = (payload) =>
  client.put(`/change-context`, payload);
/////context values
export const saveContextValue = (payload) =>
  client.post(`/context-value`, payload);
export const getContextValue = (payload) =>
  client.get(`/get-context-value`, { params: { payload } });
// export const deleteContextFlowById = (payload) =>
//   client.delete('/contextflow/delete', {data: payload});

const ContextFlowClientApi = {
  getAllContextFlow,
  saveContextFlow,
  saveContextValue,
  updateContextFlowById,
  updateContextFlowByDrag,
  removeAttentionEntities,
  saveContextType,
};

export default ContextFlowClientApi;
