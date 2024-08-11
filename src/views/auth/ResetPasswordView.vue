<script setup>
    import AuthAPI from '@/api/AuthAPI';
    import { inject, onMounted, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    const toast = inject('toast');
    const route = useRoute();
    const router = useRouter();
    
    const validToken = ref(false);
    const {token} = route.params;

    onMounted(() => {
        AuthAPI.verifyPasswordResetToken(token)
            .then(() => validToken.value = true)
            .catch(({response: {data}}) => 
                toast.open(data));
    });

    const handleSubmit = async ({password}) => {
        try {
            const {data} = await AuthAPI.updatePassword(token, {password});
            toast.open(data);
            router.push({name: 'login'});
        } catch ({response: {data}}) {
            toast.open(data);
        }
    }
</script>


<template>
    <div v-if="validToken">

        <h1 class="text-extrabold text-6xl text-white text-center mt-10">
            Nuevo Password
        </h1>
    
        <p class="text-2xl text-white text-center my-5 ">
            Ingresa tu nuevo Password.
        </p>
    
        <FormKit
            id="new-password-form"
            type="form"
            submit-label="Guardar Instrucciones"
            incomplete-message="No se pudo enviar, Revisa los mensajes"
            @submit="handleSubmit"
        >
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
    </div>

    <div v-else>
        <h1 class="text-extrabold text-6xl text-white text-center mt-10">
            Token no Valido
        </h1>
    
        <p class="text-2xl text-white text-center my-5 ">
            Puede que el Token haya expirado o no sea valido.
        </p>
    </div>
</template>