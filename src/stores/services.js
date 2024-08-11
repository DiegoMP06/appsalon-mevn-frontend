import { ref, onMounted } from 'vue';
import { defineStore } from 'pinia';
import ServicesAPI from '@/api/ServicesAPI';

export const useServicesStore = defineStore('services', () => {
    const services = ref([]);

    onMounted(() => {
        ServicesAPI.all()
            .then(({data}) => services.value = data)
            .catch(error => console.log(error));
    });

    return {
        services,
    };
});