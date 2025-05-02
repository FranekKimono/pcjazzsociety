<template>
  <div class="two-column-alt-container my-8">
    <div class="grid md:grid-cols-8 gap-8">
      <div class="column-left md:col-span-5">
        <slot name="left" />
      </div>
      <div class="column-right md:col-span-3">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<script setup>
// Two-column layout component with alternative column split (5/3) for Nuxt Content
</script>
