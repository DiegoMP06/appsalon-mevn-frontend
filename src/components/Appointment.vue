<script setup>
    import {RouterLink} from 'vue-router'
    import {displayDate} from '@/helpers/date';
    import {formatCurrency} from '@/helpers';
import { useAppointmentsStore } from '@/stores/appointments';

    defineProps({
        appointment: {
            type:Object,
            required: true,
        }
    })

    const appointmentStore = useAppointmentsStore();
</script>

<template>
    <div class="bg-white p-5 space-y-3 rounded-lg flex flex-col justify-between">
        <p class="text-gray-500 font-black">
            Fecha: <span class="font-light">{{ displayDate(appointment.date) }}</span>
            Hora: <span class="font-light">{{ appointment.time }} Horas.</span>
        </p>

        <p class="text-lg font-black">
            Servicios Solicitados en la Cita: 
        </p>

        <div 
            v-for="service in appointment.services" 
            :key="service._id" 
        >
            <p>
                {{ service.name }}
            </p>

            <p class="text-2xl font-black text-blue-500">
                {{ formatCurrency(service.price) }}
            </p>
        </div>

        <p class="text-2xl font-black text-right">
            Total a Pagar: <span class="text-blue-500">{{ formatCurrency(appointment.amount) }}</span> 
        </p>

        <div class="flex gap-2 items-center">
            <RouterLink 
                :to="{name: 'appointments.edit', params: {id: appointment._id}}" 
                class="bg-slate-600 rounded-lg p-3 text-sm uppercase font-black flex-1 md:flex-none text-white text-center"
            >
                Editar Cita
            </RouterLink>

            <button 
                class="bg-red-600 rounded-lg p-3 text-sm uppercase font-black flex-1 md:flex-none text-white text-center"
                @click="appointmentStore.cancelAppointment(appointment._id)"
            >
                Cancelar Cita
            </button>
        </div>
    </div>
</template>