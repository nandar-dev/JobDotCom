import { createI18n } from "vue-i18n";

// import store from "../store";
import messages from "./getLang";

// const lang = store.state.user.lang;
const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: "en",
  messages: {
    en: { ...messages.en },
    cn: { ...messages.cn },
  },
});
// Locals(i18n.global.fallbackLocale.value);

export function changeLang(locale) {
  i18n.global.locale.value = locale;
  // store.dispatch("user/setLang", locale);
}
export default i18n;
