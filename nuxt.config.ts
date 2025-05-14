// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/color-mode",
    "@nuxtjs/robots",
    "@nuxtjs/sitemap",
    "@nuxt/content",
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "nuxt-gtag",
  ],
  site: {
    url: process.env.NUXT_SITE_URL || "https://siemowit.com",
    name: process.env.NUXT_SITE_NAME || "Siemowit",
    primaryDomain: process.env.NUXT_PRIMARY_DOMAIN || "siemowit.com",
  },
  runtimeConfig: {
    // Private keys that are exposed to the server
    public: {
      // Keys that are exposed to the client
      site: {
        url: process.env.NUXT_SITE_URL || "https://siemowit.com",
        name: process.env.NUXT_SITE_NAME || "Siemowit",
        primaryDomain: process.env.NUXT_PRIMARY_DOMAIN || "siemowit.com",
      },
      primaryColor: process.env.NUXT_PRIMARY_COLOR || "#242eb6", // blue default
      fonts: {
        main: process.env.NUXT_FONT_MAIN || "Lato",
        code: process.env.NUXT_FONT_CODE || "Fira Code",
      },
    },
  },
  sitemap: {
    xslColumns: [
      { label: "URL", width: "50%" },
      { label: "Last Modified", select: "sitemap:lastmod", width: "25%" },
      { label: "Priority", select: "sitemap:priority", width: "12.5%" },
      {
        label: "Change Frequency",
        select: "sitemap:changefreq",
        width: "12.5%",
      },
    ],
  },
  gtag: {
    id: "",
  },
  content: {
    build: {
      markdown: {
        highlight: {
          theme: "kanagawa-dragon",
          themes: [
            "kanagawa-dragon",
            "github-dark",
            "github-light",
            "dracula",
            "vesper",
          ],
          preload: ["ini", "html", "xml", "yaml"],
        },
        remarkPlugins: {
          "remark-mermaidjs": {
            simple: true,
            mermaidConfig: {
              theme: "base",
              themeVariables: {
                primaryTextColor: "#fafafa", // zinc-50
                primaryColor: "#52525b", // zinc-600
                primaryBorderColor: "transparent",
                background: "transparent",
                secondaryColor: "transparent",
                tertiaryColor: "transparent",
                lineColor: "#71717a", // zinc-500
              },
            },
          },
          "remark-extended-table": {},
        },
      },
    },
  },
  nitro: {
    prerender: {
      routes: [],
    },
  },
  tailwindcss: {
    cssPath: [`~/assets/css/tailwind.css`, { injectPosition: "first" }],
    config: {},
    viewer: true,
    exposeConfig: true,
    // injectPosition: "first",
  },
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || "/",
    head: {
      title: "Company Inc - Business Solutions",
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover",
        },
        {
          name: "description",
          content:
            "Company Inc provides innovative business solutions for enterprises.",
        },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "icon", type: "image/png", href: "/favicon.png" },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "apple-touch-icon", href: "/favicon.png" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: `https://fonts.googleapis.com/css2?family=${
            process.env.NUXT_FONT_MAIN || "Lato"
          }:wght@300;400;700;900&display=swap`,
        },
        {
          rel: "stylesheet",
          href: `https://fonts.googleapis.com/css2?family=${(
            process.env.NUXT_FONT_CODE || "Fira Code"
          ).replace(/ /g, "+")}:wght@300;400;500;600;700&display=swap`,
        },
      ],
      style: [
        {
          textContent:
            "body{background-color:#18181b;color:#d4d4d8;opacity:1!important;}",
        },
      ],
      script: [
        /*      TODO: Reenable when we can set the color scheme to dark
                {
                  src: 'https://js.hs-scripts.com/46802347.js',
                  async: true,
                  defer: true
                }*/
      ],
    },
  },
  image: {
    domains: ["fluxinc.github.io"],
    presets: {
      default: {
        modifiers: {
          format: "webp",
          quality: 80,
          placeholder: false,
        },
      },
    },
    dir: "public",
    staticFilename: "[name][ext]",
  },
  compatibilityDate: "2025-03-11",
  experimental: {
    payloadExtraction: false,
  },
});
