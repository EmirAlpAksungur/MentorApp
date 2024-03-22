import { useCallback, useState } from "react";
import { Grid, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LanguageSelect from "../LanguageSelect";
import { uuidv4 } from "../../../utils/uuidGenerator";
export interface LanguageElementType {
  uuid: string;
  name: string;
  level: number;
}

interface LanguageSelectContType {
  handleChangeFunc?: (value: LanguageElementType[]) => void;
  value?: LanguageElementType[];
  [key: string]: any;
}

export default function UniversityContainer(props: LanguageSelectContType) {
  const { handleChangeFunc = () => {}, value = [], ...rest } = props;

  const addNewLanguage = () => {
    const copy = Array.from(value);
    copy.push({
      uuid: uuidv4(),
      name: "",
      level: 0,
    });
    handleChangeFunc(copy);
  };

  const handleChange = (uuid: string, name: string, level: number) => {
    let copy = JSON.stringify(value);

    const copyArr = JSON.parse(copy).map((e: LanguageElementType) => {
      if (e.uuid === uuid) {
        e.name = name;
        e.level = level;
      }
      return e;
    });

    handleChangeFunc(copyArr);
  };
  const removeElement = (uuid: string) => {
    let copy = JSON.stringify(value);

    const copyArr = JSON.parse(copy).filter(
      (e: LanguageElementType) => e.uuid !== uuid
    );

    handleChangeFunc(copyArr);
  };
  return (
    <Grid container rowSpacing={2}>
      {value.map((e) => {
        return (
          <Grid key={e.uuid} item xs={12}>
            <LanguageSelect
              uuid={e.uuid}
              name={e.name}
              level={e.level}
              handleChangeFunc={handleChange}
              removeElement={removeElement}
            />
          </Grid>
        );
      })}
      <Grid key={"new_language"} item xs={12}>
        <IconButton onClick={addNewLanguage}>
          <AddIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}
