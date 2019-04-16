import Vue from "vue"
import VueI18n from "vue-i18n"

Vue.use(VueI18n)

export default ({ app }) => {
  app.i18n = new VueI18n({
    locale: process.client ? navigator.language.slice(0, 2) : "it",
    fallbackLocale: "it",
    messages: {
      it: require("@/assets/i18n/it.json").messages,
      en: require("@/assets/i18n/en.json").messages
    },
    dateTimeFormats: {
      it: require("@/assets/i18n/it.json").dateTimeFormats,
      en: require("@/assets/i18n/en.json").dateTimeFormats
    },
    silentTranslationWarn: true
  })
}
