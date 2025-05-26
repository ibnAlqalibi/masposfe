<template>
  <button
    @click="$emit('click')"
    :class="[
      'px-[16px] h-[32px] rounded-lg text-sm whitespace-nowrap',
      isActive ? 'bg-[#2C59E5] text-white' : 'text-[#2C59E5] bg-blue-50',
    ]"
  >
    {{ name }}
  </button>
</template>

<script setup>
defineProps({
  name: String,
  isActive: Boolean,
});
defineEmits(["click"]);
</script>
