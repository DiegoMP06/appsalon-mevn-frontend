<script setup>
    import {onMounted} from 'vue'
    import { RouterView, RouterLink, useRoute, useRouter } from 'vue-router';
    import AppointmentAPI from '@/api/AppointmentAPI';
    import {useAppointmentsStore} from '@/stores/appointments';

    const route = useRoute();
    const router = useRouter();
    const appointmentsStore = useAppointmentsStore();

    const {id} = route.params

    onMounted(async () => {
        try {
            const {data} = await AppointmentAPI.getById(id);
            appointmentsStore.setSelectedAppointment(data);
        } catch (error) {
            router.push({name: 'my-appointments'});
        }
    });
</script>

<template>
    <nav class="my-5 flex gap-3">
        <RouterLink 
            :to="{name: 'appointments.edit'}"
            class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white "
            :class="[route.name === 'appointments.edit' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500']"
        >
            Servicios
        </RouterLink>

        <RouterLink 
            :to="{name: 'appointments.edit.details'}"
            class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white"
            :class="[route.name === 'appointments.edit.details' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500']"
        >
            Cita y Resumen
        </RouterLink>
    </nav>

    <div class="space-y-5">
        <RouterView />
    </div>
</template>