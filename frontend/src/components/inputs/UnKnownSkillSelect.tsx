import React from "react";
import { Grid } from "@mui/material";
import { MySelect, MySlide } from "..";
import { useAppSelector } from "../../hooks/redux";
import { RootState } from "../../store/configureStore";
import SkillService from "../../services/api/skills";
import "../../assets/components/inputs/select.scss";
interface SkillType {
  skill: number;
  level: number;
}

interface SkillSelectProps {
  value: SkillType[];
  handleChangeFunc: (value: any) => void;
  [key: string]: any;
}

const MyUnKnownSkillSelect: React.FC<SkillSelectProps> = (props) => {
  const { value = [], handleChangeFunc = () => {}, ...rest } = props;
  const [values, setValues] = React.useState([]);
  const token = useAppSelector((state: RootState) => state.auth.token);

  const LanguageId = useAppSelector(
    (state: RootState) => state.languages.LanguageId
  );
  const handleChange = (val: number) => {
    handleChangeFunc([{ skill: val, level: value?.[0]?.level }]);
  };
  const handleLevelChange = (lev: number) => {
    handleChangeFunc([{ skill: value?.[0]?.skill, level: lev }]);
  };

  const asyncFunc = async () => {
    try {
      let result = await SkillService.allSkills({ LanguageId }, token);
      setValues(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    asyncFunc();
  }, []);

  return (
    <Grid container columnSpacing={2} alignItems={"center"}>
      <Grid item xs={4}>
        <MySelect
          valuesPath={"SkillId"}
          dataTextPath={"name"}
          values={values}
          value={value?.[0]?.skill}
          handleChangeFunc={handleChange}
        />
      </Grid>
      <Grid item xs={8} alignSelf={"center"}>
        <MySlide
          min={0}
          max={5}
          step={1}
          value={value?.[0]?.level}
          color="success"
          handleChangeFunc={handleLevelChange}
        />
      </Grid>
    </Grid>
  );
};

export default MyUnKnownSkillSelect;
