import TranslationsService from "../api/translations";
import { TranslatedTextType } from "../types/translations";

export const asyncLoadText = async (
  LanguageId: number,
  TextContentIds: number[]
): Promise<TranslatedTextType> => {
  try {
    let res = await TranslationsService.getTranslationsById({
      LanguageId,
      TextContentIds,
    });
    console.log(res);

    return Promise.resolve(res.data);
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};
