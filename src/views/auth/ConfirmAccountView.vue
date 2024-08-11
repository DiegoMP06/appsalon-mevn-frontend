<script setup>
    import {onMounted, inject} from 'vue';
    import {useRoute, useRouter} from 'vue-router';
    import AuthAPI from '@/api/AuthAPI';

    const toast = inject('toast');
    const route = useRoute();
    const router = useRouter();
    const {token} = route.params;

    onMounted(async () => {
        try {
            const {data} = await AuthAPI.verifyAccount(token);
            toast.open(data);

            setTimeout(() => 
                router.push({name: 'login'}), 5000);
        } catch ({response: {data}}) {
            toast.open(data)
        }
    });
    console.log(token)
    
</script>

<template>
    <h1 class="text-extrabold text-6xl text-white text-center mt-10">
        Verificar Cuenta
    </h1>
</template>