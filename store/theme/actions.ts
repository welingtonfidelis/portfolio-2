import { ThemeInterface } from "./model";
import { CHANGE_THEME } from "./types";

export const changeTheme = (payload: ThemeInterface) => ({
  type: CHANGE_THEME,
  payload,
});
