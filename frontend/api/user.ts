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

export const getUserInfo = async (params: any, success: any, fail: any) => {
    await api.get(`/user`).then(success).catch(fail);
}

export const updateUserInfo = async (params: any, success: any, fail: any) => {
    await api.patch(`/user`, params).then(success).catch(fail);
}

export const updateProfileImage =  async (params: any, success: any, fail: any) => {
    await api.patch(`/user/image`, params, {
        headers: { "Content-Type": "multipart/form-data" },
      }).then(success).catch(fail);
}

export const deleteUser = async (params: any, success: any, fail: any) => {
    await api.delete(`/user`).then(success).catch(fail);
}

