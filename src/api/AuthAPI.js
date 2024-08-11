import axios from "@/lib/axios";

export default {
    register(data) {
        return axios.post(`/api/auth/register`, data);
    },
    verifyAccount(token) {
        return axios.get(`/api/auth/verify/${token}`);
    },
    login(data) {
        return axios.post(`/api/auth/login`, data);
    },
    forgotPassword(data) {
        return axios.post(`/api/auth/forgot-password`, data);
    },
    verifyPasswordResetToken(token) {
        return axios.get(`/api/auth/forgot-password/${token}`);
    },
    updatePassword(token, data) {
        return axios.post(`/api/auth/forgot-password/${token}`, data);
    },
    user() {
        return axios.get(`/api/auth/user`);
    },
    admin() {
        return axios.get(`/api/auth/admin`);
    }
};