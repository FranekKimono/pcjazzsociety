<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
// Add color-scheme meta tag to support OS-level preference
useHead({
  meta: [
    {
      name: "color-scheme",
      content: "light dark",
    },
  ],
});
</script>

<style>
/* Minimal CSS - Tailwind will handle most styling via main.css */
</style>
