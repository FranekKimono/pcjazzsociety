<template>
  <div
    class="flex flex-wrap items-center gap-3 my-6"
    :class="marginBottomClass"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  marginBottom?: string; // e.g., '2', '4', '6', '8', '10', '12'
}

const props = withDefaults(defineProps<Props>(), {
  marginBottom: undefined, // No margin by default, or you could set a default like '6'
});

const marginBottomClass = computed(() => {
  return props.marginBottom ? `mb-${props.marginBottom}` : "";
});

// ProseButtonGroup provides appropriate spacing and layout for grouped buttons in Markdown content
</script>
