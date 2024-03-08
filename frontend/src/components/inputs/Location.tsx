import React, { useEffect, useState } from "react";
import { TextField, Grid } from "@mui/material";
import { useAppSelector } from "../../hooks/redux";
import { RootState } from "../../store/configureStore";
import LocationService from "../../services/api/location";
import { MySelect } from "../index";
import "../../assets/components/inputs/textField.scss";
interface MyTextfieldType {
  handleChangeFunc?: (value: any) => void;
  value?: string;
  [key: string]: any;
}

interface CountryType {
  CountryId: number;
  name: string;
}
interface CityType {
  CityId: number;
  name: string;
}

const MyTextfield: React.FC<MyTextfieldType> = (props) => {
  const { handleChangeFunc = () => {}, value = "", ...rest } = props;
  const [country, setCountry] = useState<string>("");
  const [countries, setCountries] = useState<CountryType[]>([]);
  const [city, setCity] = useState<string>("");
  const [cities, setCities] = useState<CityType[]>([]);
  const token = useAppSelector((state: RootState) => state.auth.token);
  const LanguageId = useAppSelector(
    (state: RootState) => state.languages.LanguageId
  );

  const helperAsync = async () => {
    try {
      const result = await LocationService.getCountryList(
        { LanguageId },
        token
      );
      setCountries(result.data);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (e: string) => {
    setCity(e);
    handleChangeFunc(e);
  };

  const handleChangeCountry = async (CountryId: string) => {
    setCountry(CountryId);
    try {
      const result = await LocationService.getCityList({ CountryId }, token);
      setCities(result.data);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    helperAsync();
  }, [LanguageId]);

  return (
    <Grid container columnSpacing={2}>
      <Grid item xs={6}>
        <MySelect
          values={countries}
          defaultValue={country}
          valuesPath={"CountryId"}
          dataTextPath={"name"}
          handleChangeFunc={handleChangeCountry}
        />
      </Grid>
      <Grid item xs={6}>
        <MySelect
          values={cities}
          defaultValue={city}
          valuesPath={"CityId"}
          dataTextPath={"name"}
          handleChangeFunc={handleChange}
        />
      </Grid>
    </Grid>
  );
};

export default React.memo(MyTextfield);
