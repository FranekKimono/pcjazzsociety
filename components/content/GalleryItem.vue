<template>
  <div>
    <NuxtImg
      :src="src"
      :alt="alt || 'Gallery image'"
      class="w-full h-auto object-cover rounded-md shadow-md"
      loading="lazy"
      format="webp"
      sizes="100vw sm:50vw md:33vw"
    />
    <!-- You could add a caption slot here if needed later -->
    <!-- <slot name="caption" /> -->
  </div>
</template>

<script setup lang="ts">
defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: "",
  },
});
</script>
