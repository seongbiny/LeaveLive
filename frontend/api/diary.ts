import { apiInstance } from ".";

const api = apiInstance();

export const getMyAllDiary = async (params: any, success: any, fail: any) => {
  await api.get(`/diary/my-diary`).then(success).catch(fail);
};

export const getDiary = async (date: any, success: any, fail: any) => {
  await api.get(`/diary?date=${date}`).then(success).catch(fail);
};

export const publicDiary = async (params: any, success: any, fail: any) => {
  await api.get(`/diary/public`).then(success).catch(fail);
};