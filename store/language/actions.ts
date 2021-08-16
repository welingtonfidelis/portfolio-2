import { LanguageInterface } from "./model";
import { CHANGE_LANGUAGE } from "./types";

export const changeLanguage = (payload: LanguageInterface) => ({
  type: CHANGE_LANGUAGE,
  payload,
});
