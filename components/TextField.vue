<script setup lang="ts">

const props = defineProps<{
    title: string;
    type: string;
    modelValue: string;
}>();

const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void,
}>();

const showTitle = ref(false);

const localState = computed({
    get() {
        showTitle.value = props.modelValue.length > 0;

        let newVal = props.modelValue;

        // If date, convert to nice HTML string
        if (props.type === 'date') {
            const parts = newVal.split('/');
            newVal = `${parts[0]}-${parts[1]}-${parts[2]}`;
        }

        return newVal;
    },
    set(value) {
        showTitle.value = props.modelValue?.length > 0;

        // If date, convert to nice js string
        if (props.type === 'date') {
            const parts = value.split('-');
            value = `${parts[0]}/${parts[1]}/${parts[2]}`;
        }

        emits('update:modelValue', value);
    }
});

</script>

<template>
    <div class="w-full">
        <strong>{{ title }}</strong>
        <input :type="type" v-model="localState" />
    </div>
</template>