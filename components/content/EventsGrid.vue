<!-- TODO: Add EventsGrid component -->

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 py-6">
    <slot />
  </div>
</template>

<script setup>
// Basic grid layout component for events.
</script>

<style scoped>
/* Add any specific styles for the event grid items if needed */
.grid ::v-deep(img) {
  @apply rounded-lg shadow-lg object-cover w-full h-auto; /* Adjust styling as needed */
}
</style>
