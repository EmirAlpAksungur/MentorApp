import { CHANGE_LANGUAGE } from "../types/redux";

import { Dispatch } from "redux";

import { LanguagesStateType } from "../reducers/languages";

export const changeLanguage =
  (payload: LanguagesStateType) => (dispatch: Dispatch) => {
    dispatch({
      type: CHANGE_LANGUAGE,
      payload,
    });
  };
