<template>
  <NuxtLink
    v-if="nextLocaleToSwitchTo"
    :to="switchLocalePath(nextLocaleToSwitchTo.code)"
    class="locale-switcher-link"
    @click.prevent="handleClick"
  >
    {{ currentLocaleCodeUpperCase }}
  </NuxtLink>
</template>

<script setup>
const { locale, locales, setLocale } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const router = useRouter();

const currentLocaleCodeUpperCase = computed(() => {
  return locale.value.toUpperCase();
});

const nextLocaleToSwitchTo = computed(() => {
  if (locales.value.length < 2) return null;
  return locales.value.find((l) => l.code !== locale.value) || locales.value[0];
});

const handleClick = async () => {
  if (nextLocaleToSwitchTo.value) {
    const newPath = switchLocalePath(nextLocaleToSwitchTo.value.code);
    await setLocale(nextLocaleToSwitchTo.value.code);
    // It seems switchLocalePath alone might not always trigger a full navigation update in some Nuxt/i18n versions for the same page
    // or when programmatically setting locale. Explicitly navigating ensures the page re-renders with the new locale context.
    router.push(newPath);
  }
};
</script>

<style scoped>
.locale-switcher-link {
  /* Style to match other nav items - these would typically be inherited if placed inside an <li> */
  /* You might need to adjust these based on your .nav-item a styling in default.vue */
  @apply text-zinc-50 uppercase font-medium text-xs;
  letter-spacing: 0.03em;
  font-size: 0.8rem;
  line-height: 1;
  padding: 0.5rem 0; /* Match existing nav-item a padding if possible */
  display: inline-block;
  text-align: left;
  white-space: nowrap;
  cursor: pointer;
}

.locale-switcher-link:hover {
  @apply text-primary-500; /* Example hover state, match your theme */
}
</style>
