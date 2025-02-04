// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxt/eslint",
    "nuxt-codemirror",
    "@nuxt/image",
  ],
  typescript: {
    tsConfig: {
      compilerOptions: {
        baseUrl: ".",
      },
    },
  },
  css: ["~/assets/css/base.styl"],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  app: {
    head: {
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.bunny.net",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.bunny.net/css?family=press-start-2p:400",
        },
      ],
    },
  },
});
