import { CHANGE_TEXT } from "../types/redux";

export interface CheckReduxStateType {
  text: string;
}

const initialState: CheckReduxStateType = {
  text: "home",
};

interface action {
  type: string;
  payload: CheckReduxStateType;
}

export default function (
  state = <CheckReduxStateType>initialState,
  action: action
) {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_TEXT: {
      return {
        ...state,
        text: payload,
      };
    }
    default:
      return state;
  }
}
