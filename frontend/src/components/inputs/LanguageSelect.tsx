import React, { useEffect, useState } from "react";
import { Grid, IconButton } from "@mui/material";
import { MyTextField, MySlide } from "..";
import RemoveIcon from "@mui/icons-material/Remove";
import "../../assets/components/inputs/textField.scss";
interface LanguageSelectType {
  handleChangeFunc?: (uuid: string, name: string, level: number) => void;
  removeElement?: (uuid: string) => void;
  uuid: string;
  name: string;
  level: number;
  [key: string]: any;
}

const LanguageSelect: React.FC<LanguageSelectType> = (props) => {
  const {
    handleChangeFunc = () => {},
    removeElement = () => {},
    uuid,
    name,
    value,
    level,
    ...rest
  } = props;

  const handleLevelChange = async (e: number) => {
    handleChangeFunc(uuid, name, e);
  };

  const handleNameChange = async (e: string) => {
    handleChangeFunc(uuid, e, level);
  };

  return (
    <Grid container alignItems={"center"}>
      <Grid
        item
        sx={{
          paddingRight: "8px",
          display: "flex",
        }}
      >
        <IconButton
          onClick={() => {
            removeElement(uuid);
          }}
        >
          <RemoveIcon sx={{ color: "red" }} />
        </IconButton>
      </Grid>
      <Grid item sx={{ flexGrow: 1 }}>
        <Grid container columnSpacing={2}>
          <Grid item xs={4}>
            <MyTextField value={name} handleChangeFunc={handleNameChange} />
          </Grid>
          <Grid item xs={8} alignSelf={"center"}>
            <MySlide
              min={0}
              max={5}
              step={1}
              value={level}
              color="success"
              handleChangeFunc={handleLevelChange}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default React.memo(LanguageSelect);
