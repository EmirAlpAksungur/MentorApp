import { LOGIN_UPDATE_VALUE, LOGIN_SET_ERROR } from "../types/redux";

export interface LoginStateType {
  values: {
    Eposta: string | undefined;
    Password: string | undefined;
  };
  errors: {
    Eposta: boolean | string;
    Password: boolean | string;
  };
}

const initialState: LoginStateType = {
  values: {
    Eposta: "",
    Password: "",
  },
  errors: {
    Eposta: false,
    Password: false,
  },
};

export interface LoginAction {
  type: string;
  payload: any;
}

export default function (
  state = <LoginStateType>initialState,
  action: LoginAction
) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_UPDATE_VALUE:
      return {
        ...state,
        values: { ...state.values, [payload.key]: payload.value },
        errors: { ...state.errors, [payload.key]: false },
      };
    case LOGIN_SET_ERROR:
      return {
        ...state,
        errors: { ...state.errors, [payload.key]: payload.value },
      };
    default:
      return state;
  }
}
