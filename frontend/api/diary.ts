import { apiInstance } from ".";

const api = apiInstance();

export const getMyAllDiary = async (params: any, success: any, fail: any) => {
    await api.get(`/diary/my-diary`).then(success).catch(fail);
  }