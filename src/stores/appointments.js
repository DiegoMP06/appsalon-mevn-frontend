import { computed, ref, onMounted, inject } from 'vue';
import { defineStore } from 'pinia';
import AppointmentAPI from '@/api/AppointmentAPI';
import { convertToISO, converToDatePicker } from '@/helpers/date';
import { useRouter } from 'vue-router';
import { watch } from 'vue';
import { useUserStore } from './user';

export const useAppointmentsStore = defineStore('appointments', () => {
    const toast = inject('toast');
    const router = useRouter();
    const userStore = useUserStore();

    const appointmentId = ref('');
    const services = ref([]);
    const date = ref('');
    const hours = ref([]);
    const time = ref('');

    const appointmentsByDate = ref([]);
    
    const START_HOUR = 10;
    const END_HOUR = 19;

    onMounted(() => {
        for(let hour = START_HOUR; hour <= END_HOUR; hour++) 
            hours.value = [...hours.value, `${hour}:00`]
    });

    watch(date, async date => {
        
        if(!date) return;
        
        const {data} = await AppointmentAPI.getByDate(date);
        
        if(appointmentId.value) {
            appointmentsByDate.value = data.filter(appointment => appointment._id !== appointmentId.value);
            time.value = data.find(appointment => appointment._id === appointmentId.value)?.time || '';
        } else {
            appointmentsByDate.value = data;
            time.value = '';
        }
    });

    function onServiceSelected(service) {
        if(services.value.some(selectedService => selectedService._id === service._id)) {
            services.value = services.value.filter(selectedService => selectedService._id !== service._id);
            return;
        }

        if(services.value.length === 2) 
            return alert('Maximo 2 servicios por cita'.toUpperCase())
        
        services.value = [...services.value, service];
    }

    async function saveAppointment() {
        const appointment = {
            services: services.value.map(service => service._id),
            date: convertToISO(date.value),
            time: time.value,
            amount: totalAmount.value,
        };

        try {
            if(appointmentId.value) {
                const {data} = await AppointmentAPI.update(appointmentId.value, appointment);
                toast.open(data);
            } else {
                const {data} = await AppointmentAPI.create(appointment);
                toast.open(data);
            }

            router.push({name: 'my-appointments'});
            clearAppointmentData();
            userStore.getUserAppointments();
        } catch {
            toast.error('Ocurrio un error al crear la cita'.toUpperCase());
        }
    }

    async function cancelAppointment(id) {
        if(!confirm('¿Estas seguro de cancelar la Cita?')) return;
        try {
            const {data} = await AppointmentAPI.delete(id);
            toast.open(data);
            userStore.userAppointments = userStore.userAppointments.filter(appointment => appointment._id !== id);
        } catch ({response: {data}}) {
            toast.open(data);
        }
    }

    function clearAppointmentData() {
        services.value = [];
        date.value = '';
        time.value = '';
        appointmentId.value = '';
    }

    function setSelectedAppointment(appointment) {
        services.value = appointment.services;
        date.value = converToDatePicker(appointment.date);
        appointmentId.value = appointment._id;
        time.value = appointment.time;
    }

    const isServiceSelected = computed(() => 
        id => services.value.some(service => service._id === id)
    );

    const noServicesSelected = computed(() => 
        services.value.length === 0
    );

    const totalAmount = computed(() => 
        services.value.reduce((total, service) => total + service.price, 0)
    );

    const isValidReservation = computed(() => 
        services.value.length && date.value.length && time.value.length
    );

    const isDateSelected = computed(() => date.value ? true : false);

    const disabledTime = computed(() => 
        hour => appointmentsByDate.value.some(appointment => appointment.time === hour)
    );

    return {
        services,
        date,
        hours,
        time,
        onServiceSelected,
        saveAppointment,
        setSelectedAppointment,
        clearAppointmentData,
        cancelAppointment,
        isServiceSelected,
        noServicesSelected,
        totalAmount,
        isValidReservation,
        isDateSelected,
        disabledTime,
    };
});