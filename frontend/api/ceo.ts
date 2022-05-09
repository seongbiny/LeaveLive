import { apiInstance } from ".";

const api = apiInstance();

export const CeoBnbCreate = async (params: any, success: any, fail: any) => {
  await api
    .post(`/accommodation/`, params, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(success)
    .catch(fail);
};
