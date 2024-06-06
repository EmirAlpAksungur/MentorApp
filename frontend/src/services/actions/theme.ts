import { CHANGE_THEME } from "../types/redux";
import { RootState, AppDispatch } from "../../store/configureStore";
import $ from "jquery";
export const applyTheme =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const theme = getState().theme.theme;
    const body = $("body");
    body.addClass(theme);
  };

export const changeTheme =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const body = $("body");

    body.toggleClass("theme-light theme-dark");
    dispatch({ type: CHANGE_THEME });
  };
