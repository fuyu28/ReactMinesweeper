import { messages } from "../locales";
import type { Lang } from "../locales";

type NestedPaths<T, D extends number = 5> = [D] extends [never]
  ? never
  : {
      [K in keyof T]: T[K] extends string
        ? K
        : `${K & string}.${NestedPaths<T[K], Prev[D]> & string}`;
    }[keyof T];
type Prev = [never, 0, 1, 2, 3, 4, 5];
type AllMessages = (typeof messages)[Lang];
type AllKeys = NestedPaths<AllMessages>;

export const t = (lang: Lang, key: AllKeys) => {
  const parts = key.split(".");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: any = messages[lang];

  for (const part of parts) {
    result = result?.[part];
    if (result === undefined) return key;
  }
  return result;
};
