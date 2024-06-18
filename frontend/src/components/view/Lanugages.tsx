import React, { useEffect, useState } from "react";
import { Grid, Chip, Tooltip, LinearProgress } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { RootState } from "../../store/configureStore";
import ProfileService from "../../services/api/profile";
import { ConnectionBar } from "../";
import { UnKnownSkillsType } from "../../services/types/unKnownSkills";
import "../../assets/components/view/unKnownSkill.scss";
import { LanguageType } from "../../services/types/languages";

export const Item: React.FC<LanguageType> = React.memo(({ name, level }) => {
  return (
    name !== "" && (
      <Tooltip title={<span className="unknownskill__tooltip">{name}</span>}>
        <Grid
          container
          justifyContent={"space-between"}
          alignItems={"center"}
          wrap="nowrap"
        >
          <Grid item xs={6} className={"unknownskill__text"}>
            {name}
          </Grid>
          {level !== 100 && (
            <Grid item xs={6}>
              <Grid container alignItems={"center"} columnGap={2}>
                <Grid item xs>
                  <LinearProgress
                    variant="determinate"
                    value={level}
                    className="unknownskill__level-bar"
                  />
                </Grid>
                <Grid item className="unknownskill__level-text">
                  %{level}
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Tooltip>
    )
  );
});

const Main: React.FC<{ languages: LanguageType[] | null }> = ({
  languages,
}) => {
  return (
    <Grid container spacing={1} className={"unknownskill"}>
      {languages?.map((laguage: LanguageType) => {
        return (
          <Grid item xs={12} key={laguage.uuid}>
            <Item
              name={laguage.name}
              level={laguage.level}
              uuid={laguage.uuid}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default React.memo(Main);
