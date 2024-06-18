import React from "react";
import { MySelect, LoadingComponent, MySlide } from "..";
import { useAppSelector } from "../../hooks/redux";
import { RootState } from "../../store/configureStore";
import SkillService from "../../services/api/skills";
import { Button, Grid, IconButton, LinearProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import "../../assets/components/inputs/unKnownSkills.scss";
import { UnKnownSkillsType } from "../../services/types/unKnownSkills";
import { uuidv4 } from "../../utils/uuidGenerator";
import Loader from "../loading/Loader";

interface UnSkillSelectProps {
  value: UnKnownSkillsType[];
  handleChangeFunc: (value: UnKnownSkillsType[]) => void;
  [key: string]: any;
}

const Skills: React.FC<UnSkillSelectProps> = (props) => {
  const token = useAppSelector((state: RootState) => state.auth.token);
  const LanguageId = useAppSelector(
    (state: RootState) => state.languages.LanguageId
  );
  const [values, setValues] = React.useState<
    { SkillId: number; SkillTypeId: number; name: string }[]
  >([]);
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
  if (values.length > 0)
    return (
      <div className="un-known-skills-input__values">
        <Grid container spacing={1} className={"unknownskill"}>
          {props.value?.map((skills) => {
            let text = values.find((a) => a.SkillId === skills.skill)?.name;
            return (
              <Grid item xs={12} key={skills.uuid}>
                <Grid container alignItems={"center"}>
                  <Grid item xs={11}>
                    <Grid
                      container
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      wrap="nowrap"
                    >
                      <Grid item xs={6} className={"unknownskill__text"}>
                        {text}
                      </Grid>
                      <Grid item xs={6}>
                        <Grid container alignItems={"center"} columnGap={2}>
                          <Grid item xs>
                            <LinearProgress
                              variant="determinate"
                              value={skills.level}
                              className="unknownskill__level-bar"
                            />
                          </Grid>
                          <Grid item className="unknownskill__level-text">
                            %{skills.level}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton
                      className="known-skills-input__values__item__btn"
                      onClick={() => {
                        props.handleChangeFunc(
                          props.value.filter(
                            (item: UnKnownSkillsType) =>
                              item.uuid !== skills.uuid
                          )
                        );
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  return <Loader />;
};

const MySkillSelect: React.FC<UnSkillSelectProps> = (props) => {
  const { value = [], handleChangeFunc, ...rest } = props;

  const token = useAppSelector((state: RootState) => state.auth.token);
  const [skillType, setSkillType] = React.useState<number | undefined>(
    undefined
  );
  const [skillTypes, setSkillTypes] = React.useState([]);
  const [skill, setSkill] = React.useState<number | undefined>(undefined);
  const [skills, setSkills] = React.useState([]);
  const [level, setLevel] = React.useState<number>(0);
  const LanguageId = useAppSelector(
    (state: RootState) => state.languages.LanguageId
  );
  const handleChangeType = async (SkillTypeId: number) => {
    setSkillType(SkillTypeId);
    try {
      let res = await SkillService.getSkills(
        { SkillTypeId, LanguageId },
        token
      );
      console.log(res);
      setSkills(res.data);
    } catch {}
  };
  const handleChange = (value: number) => {
    setSkill(value);
  };
  const handleLevelChange = (value: number) => {
    setLevel(value);
  };
  const asyncFunc = async () => {
    try {
      setSkillTypes([]);
      let result = await SkillService.allTypes({ LanguageId }, token);
      setSkillTypes(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    asyncFunc();
  }, []);
  return (
    <div className="un-known-skills-input">
      <Skills value={value} handleChangeFunc={handleChangeFunc} />
      <div className="un-known-skills-input__select">
        <div className="un-known-skills-input__select__item">
          <MySelect
            valuesPath={"SkillTypeId"}
            dataTextPath={"name"}
            values={skillTypes}
            defaultValue={skillType ? skillType : undefined}
            handleChangeFunc={handleChangeType}
          />
        </div>
        <div className="un-known-skills-input__select__item">
          <MySelect
            valuesPath={"SkillId"}
            dataTextPath={"name"}
            values={skills}
            defaultValue={skill}
            handleChangeFunc={handleChange}
          />
        </div>
      </div>
      <MySlide
        min={0}
        max={100}
        step={5}
        value={level}
        handleChangeFunc={handleLevelChange}
        className="un-known-skills-input__slide"
      />
      <Button
        variant="contained"
        className="un-known-skills-input__btn"
        onClick={() => {
          skill &&
            handleChangeFunc([
              ...value,
              {
                uuid: uuidv4(),
                skill: skill,
                level: level,
              },
            ]);
        }}
      >
        <AddIcon />
      </Button>
    </div>
  );
};

export default MySkillSelect;
