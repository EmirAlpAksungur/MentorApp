import React, { useEffect, useState } from "react";
import { Grid, Chip } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { RootState } from "../../store/configureStore";
import ProfileService from "../../services/api/profile";
import { ConnectionBar } from "../";
import "../../assets/components/view/unKnownSkill.scss";
interface UnKnownSkillsType {
  unKnownSkills: string[];
}

interface ItemType {
  id: string;
}

const Item: React.FC<ItemType> = React.memo(({ id }) => {
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
      <Grid container justifyContent={"space-between"} alignItems={"center"}>
        <Grid item className={"unknownskill__text"}>
          {text}
        </Grid>
        <Grid item>
          <ConnectionBar connection={level} />
        </Grid>
      </Grid>
    )
  );
});

const Main: React.FC<UnKnownSkillsType> = ({ unKnownSkills }) => {
  return (
    <Grid container spacing={1} className={"unknownskill"}>
      {unKnownSkills?.map((skill_id) => {
        return (
          <Grid item xs={6} key={skill_id}>
            <Item id={skill_id} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default React.memo(Main);
