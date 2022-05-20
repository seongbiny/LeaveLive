import { apiInstance } from ".";

const api = apiInstance();

// 좋아요 누른 숙소 목록 조회
export const likeBnbList = async (params: any, success: any, fail: any) => {
    await api.get(`/accommodation/favorite/`).then(success).catch(fail);
}

// 숙소 좋아요 
export const likeBnb = async (accommodation_id: any, success: any, fail: any) => {
    await api.post(`/accommodation/favorite/${accommodation_id}`).then(success).catch(fail);
}

// 숙소 좋아요 취소
export const unlikeBnb = async (accommodation_fav_id: any, success: any, fail: any) => {
    await api.delete(`/accommodation/favorite/${accommodation_fav_id}`).then(success).catch(fail);
}

// 숙소 목록
export const bnbList = async (accommodation_loc: any, success: any, fail: any) => {
    await api.get(`/accommodation/all?accommodation_loc=${accommodation_loc}`).then(success).catch(fail);
}

// 숙소 상세보기
export const bnbDetail = async (accommodation_id: any, success: any, fail: any) => {
    await api.get(`/accommodation/detail/${accommodation_id}`).then(success).catch(fail);
}

// 숙소 예약하기
export const bnbReservation = async (accommodation_id: any, params: any, success: any, fail: any) => {
    await api.post(`/accommodation/reservation/${accommodation_id}`, params).then(success).catch(fail);
}

// 숙소 예약취소
export const bnbCancel = async (accommodation_res_id: any, success: any, fail: any) => {
    await api.delete(`/accommodation/reservation/${accommodation_res_id}`).then(success).catch(fail);
}

export const getBnbList = async (params: any, success: any, fail: any) => {
    await api.get(`/accommodation/reservation/`).then(success).catch(fail);
}

export const getPossible = async (params: any, success: any, fail: any) => {
    await api.get(`/accommodation/reservation/all/${params}`).then(success).catch(fail);
}

export const getBnbReservation = async (params: any, success: any, fail: any) => {
    await api.get(`/accommodation/reservation/${params}`).then(success).catch(fail);
}