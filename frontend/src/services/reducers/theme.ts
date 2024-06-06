import { CHANGE_THEME } from "../types/redux";

export interface ThemeStateType {
  theme: string;
}

const initialState: ThemeStateType = {
  theme: "theme-dark",
};

export interface ThemeAction {
  type: string;
  payload: ThemeStateType;
}

export default function (
  state = <ThemeStateType>initialState,
  action: ThemeAction
) {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_THEME: {
      return {
        theme: state.theme === "theme-dark" ? "theme-light" : "theme-dark",
      };
    }
    default:
      return state;
  }
}
