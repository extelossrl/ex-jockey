export default {
  mode: "universal",

  /*
   ** Headers of the page
   */
  head: {
    title: "Ex-Jockey",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#835C3B" },

  /*
   ** Global CSS
   */
  css: ["@/assets/styles/buefy.scss"],

  /*
   ** Router configuration
   */
  router: {
    middleware: ["mongodb"]
  },

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "@/plugins/i18n.js",
    { src: "@/plugins/axios.js", ssr: false },
    { src: "@/plugins/jsoneditor.js", ssr: false }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    // Doc: https://buefy.github.io/#/documentation
    "nuxt-buefy"
  ],

  /*
   ** Buefy module configuration
   */
  buefy: {
    css: false
  },

  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: "http://localhost:3001/es/"
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        })
      }
    }
  }
}
