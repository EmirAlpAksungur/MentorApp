import { instance, config } from "./baseUnit";

interface CountryListBodyType {
  LanguageId: number;
}

const getCountryList = (body: CountryListBodyType, token: string) => {
  return instance.post("/location/country/get/", body, config(token));
};

interface CityListBodyType {
  CountryId: number;
}

const getCityList = (body: CityListBodyType, token: string) => {
  return instance.post("/location/city/get/", body, config(token));
};

const getCityDetailList = (
  city_id: number,
  LanguageId: number,
  token: string
) => {
  return instance.get(
    `/location/city/details/${city_id}/${LanguageId}/`,
    config(token)
  );
};

const LocationService = {
  getCountryList,
  getCityList,
  getCityDetailList,
};

export default LocationService;
