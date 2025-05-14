import ja from "./ja";
import en from "./en";

export const messages = { ja, en };

export type Lang = keyof typeof messages;
