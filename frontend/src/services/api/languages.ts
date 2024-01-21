import { instance, unAuthConfig } from "./baseUnit";

const getLanguageList = () => {
  return instance.get("/languages/get/", unAuthConfig);
};

const LanguagesService = {
  getLanguageList,
};

export default LanguagesService;
