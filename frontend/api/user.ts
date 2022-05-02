import { apiInstance } from ".";

const api = apiInstance();

export const GoogleLoginRequest = async (params: string, success: any, fail: any) => {
    await api.post(`/oauth/jwt/google`, params).then(success).catch(fail);
}