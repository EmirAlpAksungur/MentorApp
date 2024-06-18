import React from "react";
import { MyTextField, LoadingComponent, MySlide } from "..";

import { Grid, IconButton, LinearProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import "../../assets/components/inputs/unKnownSkills.scss";
import { LanguageType } from "../../services/types/languages";
import { uuidv4 } from "../../utils/uuidGenerator";

interface UnSkillSelectProps {
  value: LanguageType[];
  handleChangeFunc: (value: LanguageType[]) => void;
  [key: string]: any;
}

const Languages: React.FC<UnSkillSelectProps> = (props) => {
  return (
    <div className="un-known-skills-input__values">
      <Grid container spacing={1} className={"unknownskill"}>
        {props.value?.map((language) => {
          return (
            <Grid item xs={12} key={language.uuid}>
              <Grid container alignItems={"center"}>
                <Grid item xs={11}>
                  <Grid
                    container
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    wrap="nowrap"
                  >
                    <Grid item xs={6} className={"unknownskill__text"}>
                      {language.name}
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container alignItems={"center"} columnGap={2}>
                        <Grid item xs>
                          <LinearProgress
                            variant="determinate"
                            value={language.level}
                            className="unknownskill__level-bar"
                          />
                        </Grid>
                        <Grid item className="unknownskill__level-text">
                          %{language.level}
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
                          (item: LanguageType) => item.uuid !== language.uuid
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
};

const LanguageSelect: React.FC<UnSkillSelectProps> = (props) => {
  const { value = [], handleChangeFunc, ...rest } = props;

  const [name, setName] = React.useState<string>("");
  const [level, setLevel] = React.useState<number>(0);
  const handleNameChange = (value: string) => {
    setName(value);
  };
  const handleLevelChange = (value: number) => {
    setLevel(value);
  };

  return (
    <div className="">
      <Languages value={value} handleChangeFunc={handleChangeFunc} />
      <Grid
        container
        justifyContent={"space-between"}
        alignItems={"center"}
        gap={2}
      >
        <Grid item xs={4}>
          <MyTextField value={name} handleChangeFunc={handleNameChange} />
        </Grid>
        <Grid item xs={6}>
          <MySlide
            min={0}
            max={100}
            step={5}
            value={level}
            handleChangeFunc={handleLevelChange}
            className="un-known-skills-input__slide"
          />
        </Grid>
        <Grid item xs>
          <IconButton
            className="known-skills-input__select__btn"
            onClick={() => {
              handleChangeFunc([
                ...value,
                {
                  uuid: uuidv4(),
                  name: name,
                  level: level,
                },
              ]);
            }}
          >
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default LanguageSelect;
