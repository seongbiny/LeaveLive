import { apiInstance } from ".";

const api = apiInstance();

export const GoogleLoginRequest = async (params: string, success: any, fail: any) => {
    await api.post(`/auth/google`, params).then(success).catch(fail);
}

export const KakaoLoginRequest = async (params: any, success: any, fail: any) => {
    await api.get(`/auth/kakao`, params).then(success).catch(fail);
}