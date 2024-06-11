import React, { useEffect, useState } from "react";
import { Grid, Chip } from "@mui/material";
import SkillService from "../../services/api/skills";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { RootState } from "../../store/configureStore";
import "../../assets/components/view/knownSkill.scss";

interface KnownSkillsType {
  knownSkills: number[] | null;
}

interface ItemType {
  id: number;
}

const Item: React.FC<ItemType> = React.memo(({ id }) => {
  const [text, setText] = useState<string>("");
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
      let res = await SkillService.oneSkillContent(body, token);
      setText(res.data);
    } catch (err) {}
  };
  useEffect(() => {
    asyncHelper();
  }, []);

  return (
    text !== "" && (
      <Chip
        label={text}
        variant="outlined"
        color="success"
        className="known-skill__box__chip"
      />
    )
  );
});

const Main: React.FC<KnownSkillsType> = ({ knownSkills }) => {
  return (
    <Grid container spacing={1} className="known-skill">
      {knownSkills?.map((skill_id) => {
        return (
          <Grid item key={skill_id} className="known-skill__box">
            <Item id={skill_id} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default React.memo(Main);
