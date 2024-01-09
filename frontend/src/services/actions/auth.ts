import { CHANGE_TEXT } from "../types/redux";

import { Dispatch } from "redux";

export const changeText = (text: string) => (dispatch: Dispatch) => {
  dispatch({
    type: CHANGE_TEXT,
    payload: text,
  });
};
