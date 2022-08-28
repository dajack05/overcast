<script setup lang="ts">
import { useAuthStore } from '~~/stores/useAuth';

const auth = useAuthStore();
await auth.loadUser();

</script>

<template>
    <div>
        Welcome {{auth.user.first_name}}
    </div>
</template>