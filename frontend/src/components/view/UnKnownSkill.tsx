import React, { useEffect, useState } from "react";
import { Grid, Chip, Tooltip, LinearProgress } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { RootState } from "../../store/configureStore";
import ProfileService from "../../services/api/profile";
import { ConnectionBar } from "../";
import { UnKnownSkillsType } from "../../services/types/unKnownSkills";
import "../../assets/components/view/unKnownSkill.scss";

interface ItemType {
  id: string;
}

export const Item: React.FC<ItemType> = React.memo(({ id }) => {
  const [text, setText] = useState<string>("");
  const [level, setLevel] = useState<number>(0);
  const token = useAppSelector((state: RootState) => state.auth.token);
  const LanguageId = useAppSelector(
    (state: RootState) => state.languages.LanguageId
  );
  const asyncHelper = async () => {
    try {
      const body = {
        LanguageId,
        SkillId: id,
      };
      let res = await ProfileService.oneUnKnownSkillContent(body, token);
      console.log(res);

      setText(res.data.content);
      setLevel(res.data.level);
    } catch (err) {}
  };
  useEffect(() => {
    asyncHelper();
  }, []);

  return (
    text !== "" && (
      <Tooltip title={<span className="unknownskill__tooltip">{text}</span>}>
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
                  value={level}
                  className="unknownskill__level-bar"
                />
              </Grid>
              <Grid item className="unknownskill__level-text">
                %{level}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Tooltip>
    )
  );
});

const Main: React.FC<{ unKnownSkills: UnKnownSkillsType[] | null }> = ({
  unKnownSkills,
}) => {
  return (
    <Grid container spacing={1} className={"unknownskill"}>
      {unKnownSkills?.map((skill_id: UnKnownSkillsType) => {
        return (
          <Grid item xs={12} key={skill_id.uuid}>
            <Item id={skill_id.uuid} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default React.memo(Main);
