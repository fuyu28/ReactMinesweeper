import { useContext } from "react";
import { I18nContext } from "./I18nContext";

export const useLang = () => useContext(I18nContext);
