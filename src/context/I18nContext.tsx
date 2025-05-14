import { createContext } from "react";
import { Lang } from "../locales";

export const I18nContext = createContext<{
  lang: Lang;
  setLang: (lang: Lang) => void;
}>({
  lang: "ja",
  setLang: () => {},
});
