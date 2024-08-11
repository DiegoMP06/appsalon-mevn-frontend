<script setup>
    import {inject} from 'vue';
    import AuthAPI from '@/api/AuthAPI';
    import {FormKit, reset} from '@formkit/vue';

    const toast = inject('toast');

    const handleSubmit = async ({password_confirm, ...formData}) => {
        try {
            const {data} = await AuthAPI.register(formData);
            toast.open(data);
            reset('register-form');
        } catch ({response: {data}}) {
            toast.open(data);
        }
    }
</script>

<template>
    <h1 class="text-extrabold text-6xl text-white text-center mt-10">
        Crea una Cuenta
    </h1>

    <p class="text-2xl text-white text-center my-5 ">
        Crea una Cuenta en AppSalon
    </p>

    <FormKit
        id="register-form"
        type="form"
        submit-label="Crear Cuenta"
        incomplete-message="No se pudo enviar, Revisa los mensajes"
        @submit="handleSubmit"
    >
        <FormKit 
            type="text"
            label="Nombre: "
            name="name"
            placeholder="Tu Nombre"
            validation="required|length:3"
            :validation-messages="{
                required: 'El Nombre es Obligatorio',
                length: 'El Nombre es muy Corto'
            }"
        />

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
            placeholder="Tu Password - Min 8 Caracteres"
            validation="required|length:8"
            :validation-messages="{
                required: 'El Password es Obligatorio',
                length: 'El Password es muy Corto'
            }"
        />

        <FormKit 
            type="password"
            label="Repetir Password: "
            name="password_confirm"
            placeholder="Repite tu Password"
            validation="required|confirm"
            :validation-messages="{
                required: 'El Password es Obligatorio',
                confirm: 'Los Passwords no son iguales'
            }"
        />
    </FormKit>
</template>