import {
  ABOUT_UPDATE_VALUE,
  ABOUT_SET_ERROR,
  CLEAN_ABOUT_FORM,
} from "../types/redux";

export interface AboutStateType {
  values: {
    about: string | undefined;
  };
  errors: {
    about: boolean | string;
  };
}

const initialState: AboutStateType = {
  values: {
    about: "",
  },
  errors: {
    about: false,
  },
};

export interface AboutAction {
  type: string;
  payload: any;
}

export default function (
  state = <AboutStateType>initialState,
  action: AboutAction
) {
  const { type, payload } = action;

  switch (type) {
    case ABOUT_UPDATE_VALUE:
      return {
        ...state,
        values: { ...state.values, [payload.key]: payload.value },
        errors: { ...state.errors, [payload.key]: false },
      };
    case ABOUT_SET_ERROR:
      return {
        ...state,
        errors: { ...state.errors, [payload.key]: payload.value },
      };
    case CLEAN_ABOUT_FORM:
      return initialState;
    default:
      return state;
  }
}
