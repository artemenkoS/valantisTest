import { AxiosResponse } from 'axios';
import { ApiResponse, axiosInstance } from './axiosInstance';
import { RequestMethod } from '../types';

export const fetchDataFromAPI = async (method: RequestMethod, params: Record<string, any>): Promise<any> => {
  const requestBody = {
    action: method,
    params: params,
  };

  try {
    const response: AxiosResponse<ApiResponse> = await axiosInstance.post('', requestBody);
    if (response.data && response.data.result) {
      return response.data.result;
    } else {
      throw new Error('Неверный формат ответа от сервера');
    }
  } catch (error) {
    throw error;
  }
};
