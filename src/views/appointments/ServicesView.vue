<script setup>
    import {storeToRefs} from 'pinia';
    import {useServicesStore} from '@/stores/services';
    import ServiceItem from '@/components/ServiceItem.vue';

    const servicesStore = useServicesStore();
    
    const {services} = storeToRefs(servicesStore);
</script>

<template>
    <h2 class="text-4xl font-extrabold text-white">
        Servicios
    </h2>

    <p class="text-white text-lg">
        A continuacion elige al menos un servicio para tu cita.
    </p>

    <div class="grid grid-cols-2 gap-5">
        <ServiceItem 
            v-for="service in services"
            :key="service._id"
            :service="service"
        />
    </div>
</template>