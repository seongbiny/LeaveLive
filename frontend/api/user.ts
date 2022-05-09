import { apiInstance } from ".";

const api = apiInstance();

export const GoogleLoginRequest = async (params: any, success: any, fail: any) => {
    await api.post(`/auth/google`, params).then(success).catch(fail);
}

export const KakaoLoginRequest = async (params: any, success: any, fail: any) => {
    await api.post(`/auth/kakao`, params).then(success).catch(fail);
}

export const getRefreshToken = async (params: any, success: any, fail: any) => {
    await api.get(`/auth/token/refresh`).then(success).catch(fail);
}