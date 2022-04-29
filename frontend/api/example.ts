import { apiInstance } from ".";

const api = apiInstance();

// api 예시
export const functionName = async (params : string, success : any, fail : any) => {
  await api.post(`/url/`, params).then(success).catch(fail);
};