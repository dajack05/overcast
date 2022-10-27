<script setup lang="ts">
import { GroupService } from '@/services/GroupService';
import type { Group } from '@ovc/common';
import { onMounted, ref } from "vue";
import GroupProfileDisplay from './GroupProfileDisplay.vue';

const all_groups = ref<Group[]>();

onMounted(async ()=>{
    const new_groups = await GroupService.GetAll();
    if(typeof(new_groups) !== 'string'){
        all_groups.value = new_groups;
    }
})
</script>

<template>
    <div class="border rounded-md">
        <p class="text-2xl">All Groups</p>
        <div>
            <GroupProfileDisplay v-for="group,i in all_groups" :key="i" :group="group" />
        </div>
    </div>
</template>