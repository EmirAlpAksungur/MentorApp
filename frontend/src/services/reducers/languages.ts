import { CHANGE_LANGUAGE } from "../types/redux";

export interface LanguagesStateType {
  LanguageCode: string;
  LanguageId: number;
  LanguageName: string;
}

const initialState: LanguagesStateType = {
  LanguageCode: "en-US",
  LanguageId: 1,
  LanguageName: "English",
};

export interface LanguageAction {
  type: string;
  payload: LanguagesStateType;
}

export default function (
  state = <LanguagesStateType>initialState,
  action: LanguageAction
) {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_LANGUAGE: {
      return {
        LanguageCode: payload.LanguageCode,
        LanguageId: payload.LanguageId,
        LanguageName: payload.LanguageName,
      };
    }
    default:
      return state;
  }
}
