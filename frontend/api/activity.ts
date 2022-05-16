import { apiInstance } from ".";

const api = apiInstance();

export const likeActivityList = async (params: any, success: any, fail: any) => {
    await api.get(`/activity/favorite/`).then(success).catch(fail);
}

export const likeActivity = async (activity_id: any, success: any, fail: any) => {
    await api.post(`/activity/favorite/${activity_id}`).then(success).catch(fail);
}

export const unlikeActivity = async (activity_id: any, success: any, fail: any) => {
    await api.delete(`/activity/favorite/${activity_id}`).then(success).catch(fail);
}

export const activityList = async (activity_loc: any, success: any, fail: any) => {
    await api.get(`/activity/all?activity_loc=${activity_loc}`).then(success).then(fail);
}

export const activityDetail = async (activity_id: any, success: any, fail: any) => {
    await api.get(`/activity/detail/${activity_id}`).then(success).catch(fail);
}

export const activityReservation = async (activity_id: any, params: any, success: any, fail: any) => {
    await api.post(`/activity/reservation/${activity_id}`, params).then(success).catch(fail);
}

export const getActivityList = async (params: any, success: any, fail: any) => {
    await api.get(`/activity/reservation/`).then(success).catch(fail);
}



export const getDiary = async (date: any, success: any, fail: any) => {
    await api.get(`/diary?date=${date}`).then(success).catch(fail);
}