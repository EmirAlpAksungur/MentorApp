import React, { useEffect, useState } from "react";
import { Grid, IconButton } from "@mui/material";
import { useAppSelector } from "../../hooks/redux";
import { RootState } from "../../store/configureStore";
import { LocationSelect, MySelect } from "..";
import RemoveIcon from "@mui/icons-material/Remove";
import UniversityService from "../../services/api/university";
import "../../assets/components/inputs/textField.scss";
interface UniversitySelectType {
  handleChangeFunc?: (key: number, val: number) => void;
  removeElement?: (value: number) => void;
  value?: number;
  index: number;
  [key: string]: any;
}
interface UniversityType {
  UniversityId: number;
  name: string;
}
const UniversitySelect: React.FC<UniversitySelectType> = (props) => {
  const {
    handleChangeFunc = () => {},
    removeElement = () => {},
    value,
    index,
    ...rest
  } = props;
  const [location, setLocation] = useState<string>("");
  const token = useAppSelector((state: RootState) => state.auth.token);
  const [university, setUniversity] = useState<number>();
  const [universities, setUniversities] = useState<UniversityType[]>([]);

  const handleLocationChange = async (e: string) => {
    try {
      const body = { CityId: parseInt(e) };
      let response = await UniversityService.getUniversityList(body, token);
      setUniversities(response.data);
    } catch (err) {}
    setLocation(e);
  };

  const handleUniversityChange = async (e: number) => {
    setUniversity(e);
    handleChangeFunc(index, e);
  };
  // const asyncLoad = async () => {
  //   if (value && value !== -1) {
  //     let result = await UniversityService.getUniversityInfoList(value, token);
  //     console.log(result);
  //     setLocation(result.data.CityId);
  //     setUniversity(result.data.UniversityId);
  //   }
  // };
  // useEffect(() => {
  //   asyncLoad();
  // }, []);
  return (
    <Grid container alignItems={"center"}>
      <Grid
        item
        sx={{
          paddingRight: "8px",
          display: value === -1 ? "none" : "flex",
        }}
      >
        <IconButton
          onClick={() => {
            removeElement(index);
          }}
        >
          <RemoveIcon sx={{ color: "red" }} />
        </IconButton>
      </Grid>
      <Grid item sx={{ flexGrow: 1 }}>
        <Grid container columnSpacing={2}>
          <Grid item xs={8}>
            <LocationSelect
              value={location}
              handleChangeFunc={handleLocationChange}
              {...rest}
            />
          </Grid>
          <Grid item xs={4}>
            <MySelect
              values={universities}
              defaultValue={university}
              valuesPath={"UniversityId"}
              dataTextPath={"name"}
              handleChangeFunc={handleUniversityChange}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default React.memo(UniversitySelect);
