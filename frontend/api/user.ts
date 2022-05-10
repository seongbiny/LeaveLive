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

export const getbnbList = async (params: any, success: any, fail: any) => {
    await api.get(`/accommodation/all?accommodation_loc=<string:accommodation_loc>`).then(success).catch(fail);
}

export const getUserInfo = async (params: any, success: any, fail: any) => {
    await api.get(`/user`).then(success).catch(fail);
}

export const updateUserInfo = async(params: any, success: any, fail: any) => {
    await api.patch(`/user`, params).then(success).catch(fail);
}