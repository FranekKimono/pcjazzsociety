<template>
  <NuxtLink
    :to="to"
    :class="[
      `inline-flex items-center justify-center
       border rounded-md
       font-medium
       transition-colors duration-200
       focus:outline-none focus:ring-2 focus:ring-offset-2`,
      variantClasses,
      sizeClasses,
    ]"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
  >
    <slot />
  </NuxtLink>
</template>

<style scoped>
:deep(p) {
  margin: 0;
  padding: 0;
}

/* Add default spacing between adjacent buttons */
.prose :deep(.nuxt-link) + .nuxt-link,
:deep(.nuxt-link) + .nuxt-link {
  margin-left: 1rem;
}

/* Ensure no margins are inherited from prose styles */
:global(.prose) :deep(p) {
  margin: 0;
  padding: 0;
}
</style>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  variant?: "primary" | "secondary" | "outline" | "text";
  to: string;
  external?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  to: "#",
  external: false,
  size: "lg",
});

const isExternalLink = computed(() => {
  return props.to.startsWith("http");
});

const variantClasses = computed(() => {
  switch (props.variant) {
    case "primary":
      return `bg-primary-600 text-primary-50 border-transparent
              hover:bg-primary-500 hover:text-white hover:no-underline
              focus:ring-primary-500`;
    case "secondary":
      return `bg-white text-primary border-white
              hover:bg-white/10 hover:text-white hover:no-underline
              focus:ring-white`;
    case "outline":
      return `bg-transparent text-white border-white/70
              hover:bg-white/10 hover:text-white hover:no-underline
              focus:ring-white`;
    case "text":
      return `bg-transparent text-white border-transparent
              hover:bg-white/10 hover:no-underline
              focus:ring-white`;
    default:
      return "";
  }
});

const sizeClasses = computed(() => {
  switch (props.size) {
    case "sm":
      return "px-2 py-1 text-xs";
    case "md":
      return "px-3 py-2 text-sm";
    case "lg":
      return "px-4 py-2 text-base";
    case "xl":
      return "px-5 py-3 text-lg";
    default:
      return "px-3 py-2 text-sm";
  }
});
</script>
