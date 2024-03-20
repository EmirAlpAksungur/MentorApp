import { instance, config } from "./baseUnit";

interface UniversityListBodyType {
  CityId: number;
}

const getUniversityList = (body: UniversityListBodyType, token: string) => {
  return instance.post("/university/get/", body, config(token));
};

const getUniversityInfoList = (id: number, token: string) => {
  return instance.get(`/university/get_university_info/${id}/`, config(token));
};

const UniversityService = {
  getUniversityList,
  getUniversityInfoList,
};

export default UniversityService;
