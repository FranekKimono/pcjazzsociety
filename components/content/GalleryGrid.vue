<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6" :class="gridClass">
    <slot />
  </div>
  <!-- Helper for Tailwind JIT to recognize dynamic classes -->
  <div v-if="false" class="md:grid-cols-2 md:grid-cols-3 md:grid-cols-4"></div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  columns: {
    type: Number,
    default: 3,
    validator: (value: number) => [2, 3, 4].includes(value), // Allow 2, 3, or 4 columns
  },
});

const gridClass = computed(() => {
  return `md:grid-cols-${props.columns}`;
});
</script>
