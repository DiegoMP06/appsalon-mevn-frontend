<script setup>
    import {ref} from 'vue';
    import {formatCurrency} from '@/helpers';
    import {useAppointmentsStore} from '@/stores/appointments';
    import VueTailwindDatepicker from 'vue-tailwind-datepicker';
    import SelectedService from '@/components/SelectedService.vue';

    const appointmentsStore = useAppointmentsStore();

    const formatter = ref({date: 'DD/MM/YYYY', month: 'MMM'});

    const disableDate = date => {
        const today = new Date();

        return date < today || date.getMonth() > today.getMonth() + 1 || [0,6].includes(date.getDay());
    }
</script>

<template>    
    <h2 class="text-4xl font-extrabold text-white">
        Detalles Cita y Resumen
    </h2>

    <p class="text-white text-lg">
        A continuacion verifica la informacion y confirma tu cita.
    </p>

    <h3 class="text-3xl font-extrabold text-white">Servicios</h3>

    <p 
        v-if="appointmentsStore.noServicesSelected" 
        class="text-white text-2xl text-center"
    >
        No Hay Servicios Seleccionados
    </p>

    <div 
        v-else 
        class="grid gap-5 grid-cols-1"
    >
        <SelectedService 
            v-for="service in appointmentsStore.services"
            :key="service._id"
            :service="service"
        />

        <p class="text-right text-white text-2xl">
            Total a Pagar: 
            <span class="font-black">
                {{ formatCurrency(appointmentsStore.totalAmount) }}
            </span>
        </p>
    </div>

    <div v-if="!appointmentsStore.noServicesSelected" class="space-y-8">
        <h3 class="text-3xl font-extrabold text-white">
            Fecha y Hora: 
        </h3>

        <div class="lg:flex gap-5 items-start">
            <div class="w-full lg:w-96 bg-white flex justify-center rounded-lg">
                <VueTailwindDatepicker 
                    :disable-date="disableDate"
                    i18n="es-mx"
                    as-single
                    no-input
                    :formatter="formatter"
                    v-model="appointmentsStore.date"
                />
            </div>

            <div v-if="appointmentsStore.isDateSelected" class="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-5 mt-10 lg:mt-0">
                <button 
                    v-for="hour in appointmentsStore.hours" 
                    :key="hour"
                    type="button" 
                    class="block text-blue-500 rounded-lg text-xl font-black p-3 disabled:opacity-50"
                    :class="[appointmentsStore.time === hour ? 'bg-blue-500 text-white' : 'bg-white']"
                    :disabled="appointmentsStore.disabledTime(hour)"
                    @click="appointmentsStore.time = hour"
                >
                    {{ hour }}
                </button>
            </div>
        </div>

        <div v-if="appointmentsStore.isValidReservation" class="flex justify-end">
            <button 
                type="button"
                class="w-full md:w-auto bg-blue-500 p-3 rounded-lg uppercase font-black text-white"
                @click="appointmentsStore.saveAppointment"
            >
                Confirmar Reservacion
            </button>
        </div>
    </div>
</template>