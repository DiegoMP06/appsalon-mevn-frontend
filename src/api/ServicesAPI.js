import axios from "@/lib/axios";

export default {
    all() {
        return axios.get('/api/services');
    }
}