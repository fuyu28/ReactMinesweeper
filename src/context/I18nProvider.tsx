import { useState } from "react";
import type { Lang } from "../locales";
import { I18nContext } from "./I18nContext";

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Lang>("ja");

  return (
    <I18nContext.Provider value={{ lang, setLang }}>
      {children}
    </I18nContext.Provider>
  );
};
