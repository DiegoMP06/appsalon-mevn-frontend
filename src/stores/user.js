import AppointmentAPI from "@/api/AppointmentAPI";
import AuthAPI from "@/api/AuthAPI";
import { defineStore } from "pinia";
import { computed } from "vue";
import { ref } from "vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";


export const useUserStore = defineStore('user', () => {
    const user = ref({});
    const router = useRouter();
    const userAppointments = ref([]);

    onMounted(async () => {
        try {
            const {data} = await AuthAPI.user();
            user.value = data;
            await getUserAppointments();
        } catch (error) {
            console.log(error)
        }
    })

    async function getUserAppointments() {
        const { data } = await AppointmentAPI.getUserAppointments(user.value._id)
        userAppointments.value = data;
    }

    function logout () {
        localStorage.removeItem('AUTH_TOKEN');
        user.value = {};
        router.push({name: 'login'});
    }

    const getUserName = computed(() => user.value?.name ? user.value.name : '');
    const noAppointments = computed(() => userAppointments.value.length === 0);

    return {
        user,
        userAppointments,
        getUserAppointments,
        logout,
        getUserName,
        noAppointments,
    }
});