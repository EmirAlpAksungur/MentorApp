import {
  CHANGEPASSWORD_UPDATE_VALUE,
  CHANGEPASSWORD_SET_ERROR,
  CLEAN_CHANGEPASSWORD_FORM,
} from "../types/redux";

export interface ChangePassStateType {
  values: {
    oldPassword: string | undefined;
    newPassword: string | undefined;
    confirmPassword: string | undefined;
  };
  errors: {
    oldPassword: boolean | string;
    newPassword: boolean | string;
    confirmPassword: boolean | string;
  };
}

const initialState: ChangePassStateType = {
  values: {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  },
  errors: {
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  },
};

export interface ChangePassAction {
  type: string;
  payload: any;
}

export default function (
  state = <ChangePassStateType>initialState,
  action: ChangePassAction
) {
  const { type, payload } = action;

  switch (type) {
    case CHANGEPASSWORD_UPDATE_VALUE:
      return {
        ...state,
        values: { ...state.values, [payload.key]: payload.value },
        errors: { ...state.errors, [payload.key]: false },
      };
    case CHANGEPASSWORD_SET_ERROR:
      return {
        ...state,
        errors: { ...state.errors, [payload.key]: payload.value },
      };
    case CLEAN_CHANGEPASSWORD_FORM:
      return initialState;
    default:
      return state;
  }
}
