<script setup lang="ts">
import { useAuthStore } from '~~/stores/useAuth';

const auth = useAuthStore();
if (!auth.user) {
    await auth.loadUser();
}
</script>
<template>
    <div>
        <Header />
        <div class="w-full h-screen flex flex-col items-center bg-slate-200 text-slate-700">
            <div class="flex w-full max-w-[500px]">
                <slot />
            </div>
        </div>
    </div>
</template>