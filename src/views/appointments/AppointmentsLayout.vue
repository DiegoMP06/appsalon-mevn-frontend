<script setup>
    import { RouterView, RouterLink} from 'vue-router';
    import {useUserStore } from '@/stores/user'

    const user = useUserStore();
</script>

<template>
    <div class="flex justify-between">
        <h1 class="text-2xl lg:text-6xl font-black text-white">App Salon</h1>

        <div class="flex flex-col space-y-5">
            <div class="flex gap-2  items-center">
                <p class="text-white text-right">
                    Hola: {{ user.getUserName }}
                </p>

                <button 
                    type="button" 
                    class="bg-red-600 hover:bg-red-700 p-2 text-white uppercase text-xs font-extrabold rounded-lg"
                    @click="user.logout"
                >
                    Cerrar Sesion
                </button>
            </div>

            <nav class="flex gap-2 justify-end items-center">
                <RouterLink
                    class="p-2 text-gray-200 text-md font-black rounded-lg"
                    :to="{name: 'my-appointments'}"
                >
                    Mis Citas
                </RouterLink>

                <RouterLink
                    class="p-2 text-white text-xs font-extrabold rounded-lg bg-blue-700 uppercase"
                    :to="{name: 'appointments.create'}"
                >
                    Nueva Cita
                </RouterLink>
            </nav>
        </div>
    </div>

    <main>
        <RouterView />
    </main>
</template>