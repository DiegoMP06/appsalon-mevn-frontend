<script setup>
    import {inject} from 'vue';
    import { useRouter } from 'vue-router';
    import {FormKit} from '@formkit/vue';
    import AuthAPI from '@/api/AuthAPI';

    const toast = inject('toast');
    const router = useRouter();
 
    const handleSubmit = async formData => {
        try {
            const {data: {token}} = await AuthAPI.login(formData);
            localStorage.setItem('AUTH_TOKEN', token);

            router.push({name: 'my-appointments'});
        } catch ({response: {data}}) {
            toast.open(data);
        }
    }
</script>

<template>
    <h1 class="text-extrabold text-6xl text-white text-center mt-10">
        Iniciar Sesion
    </h1>

    <p class="text-2xl text-white text-center my-5 ">
        Si tienes una cuenta, inicia Sesion en AppSalon
    </p>

    <FormKit
        id="login-form"
        type="form"
        submit-label="Iniciar Sesion"
        incomplete-message="No se pudo enviar, Revisa los mensajes"
        @submit="handleSubmit"
    >
        <FormKit 
            type="email"
            label="Email: "
            name="email"
            placeholder="Tu Email de Registro"
            validation="required|email"
            :validation-messages="{
                required: 'El Email es Obligatorio',
                email: 'El Email es invalido'
            }"
        />

        <FormKit 
            type="password"
            label="Password: "
            name="password"
            placeholder="Tu Password"
            validation="required"
            :validation-messages="{
                required: 'El Password es Obligatorio',
            }"
        />
    </FormKit>
</template>