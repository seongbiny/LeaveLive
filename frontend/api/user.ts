import { apiInstance } from ".";

const api = apiInstance();

export const GoogleLoginRequest = async (params: string, success: any, fail: any) => {
    await api.post(`/oauth/jwt/google`, params).then(success).catch(fail);
}

export const KakaoLoginRequest = async (params: string, success: any, fail: any) => {
    await api.post(`/oauth/auth/kakao`, params).then(success).catch(fail);
}