<script setup lang="ts">
    import Appointment from '@/components/Appointment.vue';
    import {useUserStore} from '@/stores/user';

    const user = useUserStore();
</script>

<template>
    <h2 class="text-4xl font-extrabold text-white">
        Mis Citas
    </h2>

    <p class="text-white text-lg">
        A continuacion Podras Administrar tus Próximas Citas
    </p>

    <p v-if="user.noAppointments" class="text-center text-white text-2xl my-16">
        No tienes Citas Proximas
    </p>

    <div v-else class="grid grid-cols-1 2xl:grid-cols-2 gap-5 my-16">
        <Appointment 
            v-for="appointment in user.userAppointments"
            :key="appointment._id"
            :appointment="appointment"
        />
    </div>
</template>