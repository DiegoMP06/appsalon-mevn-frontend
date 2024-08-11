<script setup lang="ts">
import AdminAppointment from '@/components/AdminAppointment.vue';
import { useUserStore } from '@/stores/user';

    const user = useUserStore();
</script>

<template>
    <p class="text-lg text-white mt-5">
        A Continuacion Podras Administrar tus Proximas Citas
    </p>

    <P 
        v-if="user.noAppointments"
        class="text-center text-white text-2xl mt-5"
    >
        No tienes Proximas Citas
    </P>

    <div 
        v-else
        class="grid grid-cols-1 gap-5 mt-10 2xl:grid-cols-2"
    >
        <AdminAppointment 
            v-for="appointment in user.userAppointments" 
            :key="appointment._id" 
            :appointment="appointment" 
        />
    </div>
</template>
