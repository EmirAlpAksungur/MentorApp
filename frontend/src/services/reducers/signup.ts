import { SIGNUP_UPDATE_VALUE, SIGNUP_SET_ERROR } from "../types/redux";

export interface SignUpStateType {
  values: {
    first_name: string | undefined;
    last_name: string | undefined;
    email: string | undefined;
    password: string | undefined;
  };
  errors: {
    first_name: boolean | string;
    last_name: boolean | string;
    email: boolean | string;
    password: boolean | string;
  };
}

const initialState: SignUpStateType = {
  values: {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  },
  errors: {
    first_name: false,
    last_name: false,
    email: false,
    password: false,
  },
};

export interface SignUpAction {
  type: string;
  payload: any;
}

export default function (
  state = <SignUpStateType>initialState,
  action: SignUpAction
) {
  const { type, payload } = action;

  switch (type) {
    case SIGNUP_UPDATE_VALUE:
      return {
        ...state,
        values: { ...state.values, [payload.key]: payload.value },
        errors: { ...state.errors, [payload.key]: false },
      };
    case SIGNUP_SET_ERROR:
      return {
        ...state,
        errors: { ...state.errors, [payload.key]: payload.value },
      };
    default:
      return state;
  }
}
