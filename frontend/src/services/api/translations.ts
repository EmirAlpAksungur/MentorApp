import { instance, unAuthConfig } from "./baseUnit";

export interface GetTranslationsByIdBodyType {
  LanguageId: number;
  TextContentIds: number[];
}

const getTranslationsById = (body: GetTranslationsByIdBodyType) => {
  return instance.post("/translations/get/ids/", body, unAuthConfig);
};

const TranslationsService = {
  getTranslationsById,
};

export default TranslationsService;
