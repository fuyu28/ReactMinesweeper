import { messages } from "../locales";
import type { Lang } from "../locales";

export const t = (lang: Lang, key: string) => {
  const parts = key.split(".");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: any = messages[lang];

  for (const part of parts) {
    result = result?.[part];
    if (result === undefined) return key;
  }
  return result;
};
