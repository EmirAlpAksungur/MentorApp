import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { Grid } from "@mui/material";
import { RootState } from "../../store/configureStore";
import { asyncLoadText } from "../../services/actions/translations";
import { TranslatedTextType } from "../../services/types/translations";
import ProfileService from "../../services/api/profile";
import Card from "./Card";
import { CardPropType } from "./Card";
import "../../assets/pages/community/community.scss";
const Main: React.FC = () => {
  const [text, setText] = useState<TranslatedTextType[]>([]);
  const LanguageId = useAppSelector(
    (state: RootState) => state.languages.LanguageId
  );
  const token = useAppSelector((state: RootState) => state.auth.token);
  const [data, setData] = useState([]);
  const asyncLoad = async () => {
    try {
      let res = await ProfileService.getProfile(token);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const helperTextLoad = async () => {
    try {
      const result = await asyncLoadText(LanguageId, [34, 35, 36]);
      Array.isArray(result) && setText(result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    asyncLoad();
  }, []);
  useEffect(() => {
    helperTextLoad();
  }, [LanguageId]);
  return (
    <div className="community-container">
      <Grid
        container
        spacing={2}
        columns={60}
        className="community-container__main-box"
        sx={{ flexGrow: 1 }}
      >
        {data.map((e: CardPropType, i) => {
          return (
            <Grid
              item
              xs={60}
              sm={30}
              md={20}
              lg={15}
              xl={12}
              key={i}
              className="community-container__main-box__item"
            >
              <Card
                mentorInfo={e.mentorInfo}
                studentInfo={e.studentInfo}
                user={e.user}
                text={text}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Main;
