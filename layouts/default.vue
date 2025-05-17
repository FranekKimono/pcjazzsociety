<template>
  <div class="nuxt-site min-h-screen flex flex-col">
    <!-- Backdrop overlay for mobile menu -->
    <div
      v-if="mobileMenuOpen"
      class="menu-backdrop fixed inset-0 bg-black bg-opacity-50 z-20"
      @click="closeMobileMenu"
    ></div>

    <header
      class="sticky-header fixed top-0 left-0 w-full py-1 bg-slate-950 z-30 transition-all duration-200"
      :class="{ scrolled: isScrolled }"
    >
      <div class="w-11/12 max-w-screen-lg my-0 mx-auto py-0 px-2">
        <div class="flex justify-between items-center py-1">
          <div class="logo">
            <NuxtLink :to="localePath('/')">
              <NuxtImg
                src="/images/pc-jazzfest-logo-color.png"
                width="100"
                height="100"
                alt="Company Inc logo"
                class="logo-image transition-all duration-200"
                densities="x1 x2"
              />
            </NuxtLink>
          </div>
          <button
            class="mobile-menu-toggle"
            @click="toggleMobileMenu"
            aria-label="Toggle navigation menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <nav class="main-nav" :class="{ 'is-open': mobileMenuOpen }">
            <ul class="nav-list">
              <li class="nav-item">
                <NuxtLink
                  :to="localePath('/events')"
                  @click="mobileMenuOpen = false"
                  :class="{
                    'active-link': $route.path === localePath('/events'),
                  }"
                  >{{ $t("nav.tickets") }}
                </NuxtLink>
              </li>
              <li class="nav-item">
                <NuxtLink
                  :to="localePath('/gallery')"
                  @click="mobileMenuOpen = false"
                  :class="{
                    'active-link': $route.path === localePath('/gallery'),
                  }"
                  >{{ $t("nav.gallery") }}
                </NuxtLink>
              </li>
              <li class="nav-item">
                <NuxtLink
                  :to="localePath('/membership')"
                  @click="mobileMenuOpen = false"
                  :class="{
                    'active-link': $route.path === localePath('/membership'),
                  }"
                  >{{ $t("nav.membership") }}
                </NuxtLink>
              </li>
              <li class="nav-item">
                <NuxtLink
                  :to="localePath('/donate')"
                  @click="mobileMenuOpen = false"
                  :class="{
                    'active-link': $route.path === localePath('/donate'),
                  }"
                  >{{ $t("nav.donate") }}</NuxtLink
                >
              </li>
              <li class="nav-item">
                <NuxtLink
                  :to="localePath('/sponsors')"
                  @click="mobileMenuOpen = false"
                  :class="{
                    'active-link': $route.path === localePath('/sponsors'),
                  }"
                  >{{ $t("nav.sponsors") }}
                </NuxtLink>
              </li>
              <li class="nav-item">
                <NuxtLink
                  :to="localePath('/contact')"
                  @click="mobileMenuOpen = false"
                  :class="{
                    'active-link': $route.path === localePath('/contact'),
                  }"
                  >{{ $t("nav.contact") }}</NuxtLink
                >
              </li>
              <li class="nav-item">
                <button @click="toggleLanguage" class="language-switcher">
                  {{ locale === "en" ? "PL" : "EN" }}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>

    <main
      class="site-main px-0 w-full flex-grow"
      :style="{ paddingTop: isScrolled ? '60px' : '72px' }"
    >
      <div class="w-full">
        <!-- <div class="w-full h-[35vh] relative">
          <NuxtImg
            src="/images/hero/jazz-splash-b.jpg"
            width="1920"
            height="1080"
            sizes="1vw"
            class="w-full h-full object-cover"
            :modifiers="{ quality: 80 }"
            densities="x1 x2"
            alt="Polish-Canadian Jazz Society"
          />
        </div> -->
        <div class="w-11/12 max-w-screen-lg mx-auto my-0">
          <slot />
        </div>
      </div>
    </main>

    <footer
      class="site-footer bg-slate-950 text-zinc-400 text-center text-sm py-6 mt-16"
    >
      <div class="max-w-screen-lg mx-auto my-0 relative z-10">
        <p>
          &copy; {{ new Date().getFullYear() }} Polish-Canadian Jazz Society.
          All rights reserved.
        </p>
        <div class="footer-links mt-2">
          <NuxtLink
            :to="localePath('/contact')"
            class="text-zinc-400 hover:text-zinc-200"
            >{{ $t("footer.contactUs") }}</NuxtLink
          >
          &dash;
          <NuxtLink
            :to="localePath('/privacy-policy')"
            class="text-zinc-400 hover:text-zinc-200"
            >{{ $t("footer.privacyPolicy") }}</NuxtLink
          >
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const mobileMenuOpen = ref(false);
const isDesktop = ref(false);
const isScrolled = ref(false);
const route = useRoute();
const { locale, setLocale, t: $t } = useI18n();
const localePath = useLocalePath();

// Handle scroll events to modify header appearance
const handleScroll = () => {
  isScrolled.value = window.scrollY > 10;
};

// Watch for route changes to reset mobile menu and restore scrolling
watch(
  () => route.path,
  () => {
    if (mobileMenuOpen.value) {
      mobileMenuOpen.value = false;
      document.body.style.overflow = "";
    }
    // Ensure we're scrolled to the top of the new page
    window.scrollTo(0, 0);
  }
);

onMounted(() => {
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);
  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Check initial scroll position
});

onUnmounted(() => {
  window.removeEventListener("resize", checkScreenSize);
  window.removeEventListener("scroll", handleScroll);
  // Ensure we clean up any overflow changes when component is unmounted
  document.body.style.overflow = "";
});

const checkScreenSize = () => {
  isDesktop.value = window.innerWidth > 768;
};

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
  if (mobileMenuOpen.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
};

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
  document.body.style.overflow = "";
};

const toggleLanguage = () => {
  const newLocale = locale.value === "en" ? "pl" : "en";
  setLocale(newLocale);
  if (mobileMenuOpen.value) {
    mobileMenuOpen.value = false; // Close mobile menu on language change
  }
};
</script>
<style scoped>
.nuxt-site {
  flex-direction: column;
}

.site-footer {
  position: relative;
  overflow: hidden;
}

.sticky-header {
  box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  transition: all 0.3s ease;
  height: 60px;
}

.sticky-header.scrolled {
  @apply py-0 shadow-lg bg-slate-950/90;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

.sticky-header.scrolled .logo {
  /* @apply my-1; */
  height: 38px; /* Slightly smaller logo when scrolled */
  width: auto;
}

.sticky-header .logo {
  display: flex;
  align-items: center;
  height: 80px;
  position: relative;
  z-index: 31;
  margin-top: -5px;
}

.sticky-header .logo-image {
  height: 120px;
  width: 120px;
  object-fit: contain;
  transition: all 0.3s ease;
  position: relative;
  top: 0;
  margin-top: 30px;
}

.sticky-header.scrolled .logo-image {
  height: 90px;
  width: 90px;
  margin-top: 35px;
}

.mobile-menu-toggle {
  display: none; /* Hidden on desktop */
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 31; /* Ensure it's above the backdrop */
}

.mobile-menu-toggle span {
  @apply bg-primary-50;
  width: 100%;
  height: 3px;
  transition: all 0.3s ease;
}

/* Improved Nav List Styling */
.main-nav .nav-list {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  margin: 0;
  padding: 0;
}

.main-nav .nav-item {
  @apply list-none;
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;
}

.main-nav .nav-item a {
  @apply text-zinc-50;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 0.03em;
  font-size: 0.8rem;
  line-height: 1;
  padding: 0.5rem 0;
  display: inline-block;
  text-align: left;
  white-space: nowrap;
}

/* Mobile Menu Styles */
@media (max-width: 768px) {
  .mobile-menu-toggle {
    display: flex;
    z-index: 40;
  }

  /* Menu backdrop should fill the entire screen and be behind the menu */
  .menu-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 20;
  }

  .main-nav {
    @apply bg-zinc-900/95;
    position: fixed;
    top: 0;
    right: -100%;
    width: 75%;
    max-width: 320px;
    height: 100vh;
    padding: 5rem 1.5rem 2rem;
    transition: right 0.3s ease;
    z-index: 40;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.2);
    overflow-y: auto;
  }

  .main-nav.is-open {
    right: 0;
  }

  .main-nav .nav-list {
    flex-direction: column;
    gap: 0;
    align-items: flex-start;
    width: 100%;
  }

  .main-nav .nav-item {
    margin: 0;
    padding: 0;
    width: 100%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .main-nav .nav-item:last-child {
    border-bottom: none;
  }

  .main-nav a {
    display: block;
    font-size: 1rem;
    padding: 1rem 0;
    width: 100%;
  }
}

/* Active link styling */
.main-nav .nav-list .nav-item a.active-link {
  @apply text-primary-500;
  font-weight: 600;
  position: relative;
}

/* Ensure active-link class works correctly with localePath */
.main-nav
  .nav-list
  .nav-item
  a:has(.router-link-active.router-link-exact-active) {
  @apply text-primary-500;
  font-weight: 600;
}

@media (min-width: 769px) {
  .main-nav .nav-list .nav-item a.active-link::after {
    display: none;
  }
}

.site-main {
  padding-top: 80px !important;
  position: relative;
  z-index: 1;
}

.language-switcher {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 0.5rem 1rem; /* Existing padding, seems reasonable */
  text-transform: uppercase; /* Added */
  font-weight: 500; /* Added */
  letter-spacing: 0.03em; /* Added */
  font-size: 0.8rem; /* Added */
  line-height: 1; /* Added */
  /* font-family: inherit; /* Ensuring it uses the same font family */
}

.language-switcher:hover {
  /* Add hover styles if desired, e.g., text-primary-500 */
  color: #a5b4fc; /* Example hover color, adjust to your theme */
}

.main-nav.is-open .language-switcher {
  /* Styles for the switcher when the mobile menu is open */
  display: block;
  width: 100%;
  text-align: left;
  padding: 1rem; /* Match other mobile nav items if necessary */
}
</style>
