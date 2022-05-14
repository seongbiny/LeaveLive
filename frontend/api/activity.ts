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