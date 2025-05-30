<template>
  <div
    class="full-width-section relative w-[calc(100vw-1.5rem)] sm:w-[calc(100vw-2rem)] left-[50%] ml-[calc(-50vw+0.75rem)] sm:ml-[calc(-50vw+1rem)]"
    :class="[
      roundedClass,
      paddingClass,
      variantClass,
      className,
      { 'bg-opacity-10': props.variant !== 'light' },
    ]"
    :style="backgroundStyles"
  >
    <div
      v-if="parsedPatternOverlay"
      class="absolute top-0 left-0 w-full h-full bg-repeat opacity-20 mix-blend-multiply z-0"
      :style="{
        backgroundImage: 'url(/images/hex-pattern.svg)',
        backgroundSize: '20px',
      }"
    ></div>
    <div
      class="w-full sm:w-11/12 max-w-screen-lg mx-auto my-0 px-4 sm:px-4 relative z-10"
      :class="contentClass"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  variant?: "default" | "primary" | "dark" | "gradient" | "light";
  rounded?: boolean;
  padding?: "none" | "sm" | "md" | "lg" | "xl" | "2xl";
  backgroundImage?: string;
  patternOverlay?: boolean | string;
  imageDisplayMode?: "cover" | "contain";
  className?: string;
  contentClass?: string;
  gradientColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  rounded: true,
  padding: "md",
  backgroundImage: "",
  patternOverlay: false,
  imageDisplayMode: "cover",
  className: "",
  contentClass: "",
  gradientColor: "",
});

// Parse the patternOverlay prop to handle both boolean and string values
const parsedPatternOverlay = computed(() => {
  if (typeof props.patternOverlay === "boolean") {
    return props.patternOverlay;
  }
  return props.patternOverlay === "true";
});

const roundedClass = computed(() => {
  return props.rounded ? "rounded-lg" : "";
});

const paddingClass = computed(() => {
  switch (props.padding) {
    case "none":
      return "py-0";
    case "sm":
      return "py-2";
    case "md":
      return "py-4";
    case "lg":
      return "py-8";
    case "xl":
      return "py-12";
    case "2xl":
      return "py-24";
    default:
      return "py-4";
  }
});

const variantClass = computed(() => {
  switch (props.variant) {
    case "default":
      return "bg-primary-900 dark:bg-primary-950";
    case "primary":
      return "bg-primary-500 text-white";
    case "dark":
      return "bg-primary-950 text-white";
    case "light":
      return "bg-primary-100 text-primary-900";
    case "gradient":
      if (props.gradientColor) {
        return `bg-gradient-to-br from-transparent via-${props.gradientColor}/50 to-transparent text-white`;
      }
      return "bg-gradient-to-br from-transparent via-primary-700/50 to-transparent text-white";
    default:
      return "bg-primary-900 dark:bg-primary-950";
  }
});

const backgroundStyles = computed(() => {
  if (!props.backgroundImage) return {};

  // Determine fallback color based on variant
  let fallbackColor = "#0f192a"; // primary-900
  if (props.variant === "light") {
    fallbackColor = "#d5e3f7"; // primary-100
  } else if (props.variant === "primary") {
    fallbackColor = "#001c40"; // primaryColor default
  } // Add other variants if needed

  return {
    backgroundImage: `url(${props.backgroundImage})`,
    backgroundSize: props.imageDisplayMode,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundColor: fallbackColor, // Add fallback color
  };
});
</script>

<style scoped></style>
