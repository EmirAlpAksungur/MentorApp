import { instance, config } from "./baseUnit";

interface CountryListBodyType {
  LanguageId: number;
}

const getCountryList = (body: CountryListBodyType, token: string) => {
  return instance.post("/location/country/get/", body, config(token));
};

interface CityListBodyType {
  CountryId: string;
}

const getCityList = (body: CityListBodyType, token: string) => {
  return instance.post("/location/city/get/", body, config(token));
};

const LocationService = {
  getCountryList,
  getCityList,
};

export default LocationService;
