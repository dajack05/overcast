<script setup lang="ts">
import { UserInfo } from '~~/server/src/User';

const props = defineProps<{
    user:UserInfo
}>();

function yearsOld():number{
    const now = new Date().getTime();
    const dobTime = new Date(props.user.dob).getTime();
    const diff = now - dobTime;
    const final = new Date(diff);
    return final.getFullYear() - 1970;
}

</script>

<template>
<div class="p2 rounded shadow bg-slate-100">
    <table>
        <tr>
            <th>Name:</th>
            <td>{{user.first_name}} {{user.last_name}}</td>
        </tr>
        <tr>
            <th>DOB:</th>
            <td>{{new Date(user.dob).toLocaleDateString()}} ({{yearsOld()}} years old)</td>
        </tr>
    </table>
</div>
</template>