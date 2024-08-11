<script setup>
    import { useAppointmentsStore } from '@/stores/appointments';
import { onMounted } from 'vue';
    import { RouterView, RouterLink, useRoute } from 'vue-router';

    const route = useRoute();
    const appointmentsStore = useAppointmentsStore();

    onMounted(() => appointmentsStore.clearAppointmentData());
</script>

<template>
    <nav class="my-5 flex gap-3">
        <RouterLink 
            :to="{name: 'appointments.create'}"
            class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white "
            :class="[route.name === 'appointments.create' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500']"
        >
            Servicios
        </RouterLink>

        <RouterLink 
            :to="{name: 'appointments.details'}"
            class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white"
            :class="[route.name === 'appointments.details' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500']"
        >
            Cita y Resumen
        </RouterLink>
    </nav>

    <div class="space-y-5">
        <RouterView />
    </div>
</template>