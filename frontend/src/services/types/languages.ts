export interface LanguageType {
  uuid: string;
  name: string;
  level: number;
}

export interface LanguagesTypes {
  languages: LanguageType[];
}

export const LanguagesFormType = [
  {
    reduxKey: "languages",
    size: 12,
    type: "languages",
    labelId: 1511,
  },
];
