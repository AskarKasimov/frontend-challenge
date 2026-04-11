import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const resources = {
  ru: {
    translation: {
      loading: "Загрузка...",
      errorLoading: "Произошла ошибка при загрузке котиков",
      loadingMore: "... загружаем еще котиков ...",
      allCats: "Все котики",
      favoriteCats: "Любимые котики",
      noFavoritesYet: "У вас пока нет любимых котиков :(",
    },
  },
} as const;

i18n.use(initReactI18next).init({
  resources,
  lng: "ru",
  fallbackLng: "ru",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
