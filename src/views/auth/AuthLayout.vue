<script setup>
    import {RouterView, RouterLink, useRoute} from 'vue-router';

    const authRoutes = [
        {
            name: 'register',
            text: 'Crear Cuenta',
        },
        {
            name: 'login',
            text: 'Iniciar Sesion',
        },
        {
            name: 'forgot-password',
            text: '¿Olvidaste tu Password?',
        },
    ];

    const route = useRoute();
</script>

<template>
    <div class="mx-auto lg:w-3/5 mt-20">
        <RouterView />

        <nav class="mt-10 flex flex-col items-center space-y-5 lg:flex-row lg:justify-between lg:space-y-0 text-white">
            <RouterLink
                v-for="authRoute in authRoutes"
                v-show="authRoute.name !== route.name"
                :key="authRoute.name"
                :to="{name: authRoute.name}"
                class="uppercase font-bold "
                active-class="text-blue-500"
            >   
                {{ authRoute.text }}
            </RouterLink>
        </nav>
    </div>
</template>