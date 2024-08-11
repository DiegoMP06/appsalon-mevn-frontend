import api from "@/lib/axios";

export default {
    create(data) {
        return api.post('/api/appointments', data);
    },
    getByDate(date) {
        return api.get(`/api/appointments?date=${date}`);
    },
    getUserAppointments(userId) {
        return  api.get(`/api/users/${userId}/appointments`);
    },
    getById(id) {
        return api.get(`/api/appointments/${id}`);
    },
    update(id, data) {
        return api.put(`/api/appointments/${id}`, data);
    },
    delete(id) {
        return api.delete(`/api/appointments/${id}`);
    }
}