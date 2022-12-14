<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';

defineProps({
    title: { required: true, type: String },
    link: { required: true, type: String },
});
const route_name = computed(() => useRoute().path || "/");
</script>
<template>
    <div class="w-[90px] flex flex-col items-center">
        <RouterLink :to="link">{{ title }}</RouterLink>
        <span :class="{ 'bg-[#41A6F6] w-full': route_name == link, 'bg-[#94b0c2] w-[6px]': route_name != link }"
            class="rounded-full transition-all min-h-[6px]"></span>
    </div>
</template>