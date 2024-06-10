import React, { useEffect, useState } from "react";
import { TextField, Grid } from "@mui/material";
import { useAppSelector } from "../../hooks/redux";
import { RootState } from "../../store/configureStore";
import LocationService from "../../services/api/location";
import { MySelect } from "../index";
import "../../assets/components/inputs/textField.scss";
interface MyTextfieldType {
  handleChangeFunc?: (value: any) => void;
  value?: number | undefined;
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
  const { handleChangeFunc = () => {}, value = undefined, ...rest } = props;
  const [country, setCountry] = useState<number | null>(null);
  const [countries, setCountries] = useState<CountryType[]>([]);
  const [city, setCity] = useState<number | undefined>(undefined);
  const [cities, setCities] = useState<CityType[]>([]);
  const token = useAppSelector((state: RootState) => state.auth.token);
  const LanguageId = useAppSelector(
    (state: RootState) => state.languages.LanguageId
  );

  const handleChange = (e: number | undefined) => {
    setCity(e);
    handleChangeFunc(e);
  };

  const handleChangeCountry = async (CountryId: number) => {
    setCountry(CountryId);
    handleChange(undefined);
    setCities([]);
  };
  const handleFirstOpen = async () => {
    try {
      if (value && !country) {
        const res = await LocationService.getCityDetailList(
          value,
          LanguageId,
          token
        );

        setCountries([
          {
            CountryId: res.data.CountryId.CountryId,
            name: res.data.CountryId.TextContentId.translation,
          },
        ]);
        setCountry(res.data.CountryId.CountryId);
        setCities([{ CityId: res.data.CityId, name: res.data.name }]);
        setCity(props?.value);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    handleFirstOpen();
  }, [LanguageId, value]);

  return (
    <Grid container columnSpacing={2}>
      <Grid item xs={6}>
        <MySelect
          values={countries}
          defaultValue={country ? country : undefined}
          valuesPath={"CountryId"}
          dataTextPath={"name"}
          onMouseDown={async () => {
            const result = await LocationService.getCountryList(
              { LanguageId },
              token
            );
            setCountries(result.data);
          }}
          handleChangeFunc={handleChangeCountry}
        />
      </Grid>
      <Grid item xs={6}>
        <MySelect
          values={cities}
          defaultValue={city ? city : undefined}
          valuesPath={"CityId"}
          dataTextPath={"name"}
          onMouseDown={async () => {
            try {
              if (country) {
                const result = await LocationService.getCityList(
                  { CountryId: country },
                  token
                );
                setCities(result.data);
              }
            } catch (err) {
              console.log(err);
            }
          }}
          handleChangeFunc={handleChange}
        />
      </Grid>
    </Grid>
  );
};

export default React.memo(MyTextfield);
