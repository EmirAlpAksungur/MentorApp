import {
  PROFILELANGUAGES_UPDATE_VALUE,
  PROFILELANGUAGES_SET_ERROR,
  CLEAN_PROFILELANGUAGES_FORM,
} from "../types/redux";
import { LanguageType } from "../types/languages";
export interface ProfileLanguagaesStateType {
  values: {
    languages: LanguageType[] | undefined;
  };
  errors: {
    languages: boolean | string;
  };
}

const initialState: ProfileLanguagaesStateType = {
  values: {
    languages: [],
  },
  errors: {
    languages: false,
  },
};

export interface ProfileLanguagesAction {
  type: string;
  payload: any;
}

export default function (
  state = <ProfileLanguagaesStateType>initialState,
  action: ProfileLanguagesAction
) {
  const { type, payload } = action;

  switch (type) {
    case PROFILELANGUAGES_UPDATE_VALUE:
      return {
        ...state,
        values: {
          ...state.values,
          [payload.key]: payload.value,
        },
        errors: { ...state.errors, [payload.key]: false },
      };
    case PROFILELANGUAGES_SET_ERROR:
      return {
        ...state,
        errors: { ...state.errors, [payload.key]: payload.value },
      };
    case CLEAN_PROFILELANGUAGES_FORM:
      return initialState;
    default:
      return state;
  }
}
