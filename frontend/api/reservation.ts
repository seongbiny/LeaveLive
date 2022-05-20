import { apiInstance } from ".";

const api = apiInstance();

export const getMyAllActivityReservation = async (params: any, success: any, fail: any) => {
    await api.get(`/activity/reservation/`).then(success).catch(fail);
  }