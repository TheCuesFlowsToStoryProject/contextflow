import axios from 'axios';
import {BASE_URL} from '../config/axios-config';

const client = axios.create({
  baseURL: BASE_URL,
});

export const saveWordPhrase = (payload) =>
  client.post(`/post-wordphrase`, payload);
export const getAllWordPhrase = () => client.get(`/get-wordphrase`);
export const updateWordPhraseById = (payload) =>
  client.put(`/wordphrase/update`, payload);
export const deleteWordPhraseById = (payload) =>
  client.delete('/wordphrase/delete', {data: payload});

const WordPhraseClientApi = {
  getAllWordPhrase,
  saveWordPhrase,
  updateWordPhraseById,
  deleteWordPhraseById,
};

export default WordPhraseClientApi;
