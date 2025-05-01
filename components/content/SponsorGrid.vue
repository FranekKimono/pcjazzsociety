<template>
  <div
    class="sponsor-grid grid grid-cols-2 gap-6 md:gap-8 items-center justify-items-center py-6"
  >
    <slot />
  </div>
</template>

<script setup>
// This component primarily provides layout via Tailwind classes in the template.
// No specific script logic is needed here.
</script>

<style scoped>
/* Style adjustments for images within the sponsor grid */
.sponsor-grid ::v-deep(img) {
  @apply max-h-20 w-auto object-contain;
  /* Adjust max-h-xx utility as needed for desired logo size */
}

/* Ensure sponsor items fill their grid cell */
.sponsor-grid ::v-deep(.sponsor-item) {
  @apply w-full h-full flex items-center justify-center;
}
</style>
