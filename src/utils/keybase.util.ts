import axios, { AxiosRequestConfig } from 'axios';
import { KEYBASE_PATH, KEYBASE_URL } from '../config';

const axiosConfig: AxiosRequestConfig = { baseURL: KEYBASE_URL };
const axiosClient = axios.create(axiosConfig);

export const keybaseFetchData = async (identity: string) => {
  try {
    const response = await axiosClient.get(KEYBASE_PATH + identity);
    const url = response.data['them'][0]['pictures']['primary']['url'];
    return url;
  } catch (e) {
    return "";
  }
}