import axiosClient from "../../../config/axiosClient";

export const getCoupons = () => axiosClient.get("/coupons");
export const getCoupon = (id) => axiosClient.get(`/coupons/${id}`);
export const createCoupon = (coupon) => axiosClient.post("/coupons", coupon);
export const updateCoupon = (id, coupon) => axiosClient.put(`/coupons/${id}`, coupon);
export const deleteCoupon = (id) => axiosClient.delete(`/coupons/${id}`);