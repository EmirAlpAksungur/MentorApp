import { instance, config } from "./baseUnit";

const allSkills = (
  body: {
    LanguageId: number;
  },
  token: string
) => {
  return instance.post("/skill/get-skill-all/", body, config(token));
};

interface SkillsListBodyType {
  SkillTypeId: number;
}

const getSkills = (body: SkillsListBodyType, token: string) => {
  return instance.post("/skill/get-skill/", body, config(token));
};

const allTypes = (token: string) => {
  return instance.get("/skill/get-type/", config(token));
};
const SkillService = {
  allSkills,
  getSkills,
  allTypes,
};

export default SkillService;
