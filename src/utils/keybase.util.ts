import axios, { AxiosRequestConfig } from 'axios';
import { KEYBASE_PATH, KEYBASE_URL } from '../config';
import { ErrorLog } from './logger.util';

const axiosConfig: AxiosRequestConfig = { baseURL: KEYBASE_URL };
const axiosClient = axios.create(axiosConfig);

export const keybaseFetchData = async (identity: string) => {
  try {
    const response = await axiosClient.get(KEYBASE_PATH + identity);
    if (response.data.status.code === 0) {
      const url = response.data['them'][0]['pictures']['primary']['url'];
      return url;
    } else {
      return null;
    }
  } catch (error) {
    ErrorLog(error);
    return null;
  }
}