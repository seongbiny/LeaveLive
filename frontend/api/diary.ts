import { apiInstance } from ".";

const api = apiInstance();

export const getMyAllDiary = async (params: any, success: any, fail: any) => {
  await api.get(`/diary/my-diary`).then(success).catch(fail);
};

export const writeDiary = async (params: any, success: any, fail: any) => {
  await api
    .post(`/diary`, params, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(success)
    .catch(fail);
};

export const updateDiary = async (
  diaryId: number,
  params: any,
  success: any,
  fail: any
) => {
  await api
    .patch(`/diary/${diaryId}`, params, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(success)
    .catch(fail);
};

export const getDiary = async (date: any, success: any, fail: any) => {
  await api.get(`/diary?date=${date}`).then(success).catch(fail);
};

export const publicDiary = async (params: any, success: any, fail: any) => {
  await api.get(`/diary/public`).then(success).catch(fail);
};

export const deleteDiary = async (diaryId: any, success: any, fail: any) => {
  await api.delete(`/diary/${diaryId}`).then(success).catch(fail);
};