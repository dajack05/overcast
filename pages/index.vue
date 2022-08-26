<script setup lang="ts">
import { useAuthStore } from '~~/stores/useAuth';

const auth = useAuthStore();

onMounted(async () => {
    const result = await auth.loadUser();
    if(result){
        console.error(result);
        useRouter().push('/auth');
    }
});

</script>

<template>
    <div v-if="auth.user" class="w-full h-screen flex flex-col items-center bg-slate-200 text-slate-700">
       <Header />
        <div class="flex w-full max-w-[500px]">
            <UserInfoDisplay :user="auth.user" />
        </div>
    </div>
</template>