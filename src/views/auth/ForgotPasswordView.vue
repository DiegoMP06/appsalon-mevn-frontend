<script setup>
    import { inject } from 'vue';
    import AuthAPI from '@/api/AuthAPI';
    import {FormKit, reset} from '@formkit/vue';

    const toast = inject('toast');

    const handleSubmit = async ({email}) => {
        try {
            const {data} = await AuthAPI.forgotPassword({email});
            toast.open(data);
            reset('forgot-password-form');
        } catch ({response: {data}}) {
            toast.open(data);
        }
    }
</script>

<template>
    <h1 class="text-extrabold text-6xl text-white text-center mt-10">
        Olvide mi Password
    </h1>

    <p class="text-2xl text-white text-center my-5 ">
        Recupera el Acceso a tu Cuenta.
    </p>

    <FormKit
        id="forgot-password-form"
        type="form"
        submit-label="Enviar Instrucciones"
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
    </FormKit>
</template>