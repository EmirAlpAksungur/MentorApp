import {
  LOGIN_UPDATE_VALUE,
  LOGIN_SET_ERROR,
  CLEAN_LOGIN_FORM,
} from "../types/redux";

export interface LoginStateType {
  values: {
    email: string | undefined;
    password: string | undefined;
  };
  errors: {
    email: boolean | string;
    password: boolean | string;
  };
}

const initialState: LoginStateType = {
  values: {
    email: "",
    password: "",
  },
  errors: {
    email: false,
    password: false,
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
    case CLEAN_LOGIN_FORM:
      return initialState;
    default:
      return state;
  }
}
