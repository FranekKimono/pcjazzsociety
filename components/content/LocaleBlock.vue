<template>
  <div v-if="lang === locale">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "#imports";

const { locale } = useI18n();

defineProps({
  lang: {
    type: String,
    required: true,
  },
});
</script>
