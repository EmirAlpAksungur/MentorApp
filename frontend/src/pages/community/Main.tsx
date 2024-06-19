import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { Grid } from "@mui/material";
import { RootState } from "../../store/configureStore";
import { asyncLoadText } from "../../services/actions/translations";
import { TranslatedTextType } from "../../services/types/translations";
import ProfileService from "../../services/api/profile";
import Card from "./card/Card";
import { CardPropType } from "./card/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import "../../assets/pages/community/community.scss";
import { LoadingComponent } from "../../components";

const Main: React.FC = () => {
  const [text, setText] = useState<TranslatedTextType[]>([]);
  const LanguageId = useAppSelector(
    (state: RootState) => state.languages.LanguageId
  );
  const token = useAppSelector((state: RootState) => state.auth.token);
  const [data, setData] = useState<CardPropType[]>([]);
  const [loading, setloading] = useState<boolean>(false);
  const [length, setLength] = useState<number>(1);
  const fetchData = async () => {
    if (loading) return;
    try {
      setloading(true);
      let res = await ProfileService.getProfile(token, data.length / 30 + 1);
      console.log(res);

      setData((prev: CardPropType[]) => {
        return [...prev, ...res.data.data];
      });
      setLength(res.data.length);
      return Promise.resolve(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setloading(false);
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
    fetchData();
  }, []);
  useEffect(() => {
    helperTextLoad();
  }, [LanguageId]);
  return (
    <InfiniteScroll
      key={Math.floor(Math.random() * (9999999 - 0 + 1))}
      dataLength={data.length}
      next={fetchData}
      hasMore={data.length < length}
      loader={
        <div style={{ width: "100%" }}>
          <LoadingComponent />
        </div>
      }
      className="community-container"
    >
      <Grid
        container
        spacing={2}
        columns={60}
        className="community-container__main-box"
        sx={{ flexGrow: 1 }}
      >
        {data.map((e: CardPropType, i: number) => {
          return (
            <Grid
              item
              xs={60}
              sm={30}
              md={20}
              xl={15}
              key={i}
              className="community-container__main-box__item"
            >
              <Card {...e} text={text} />
            </Grid>
          );
        })}
      </Grid>
    </InfiniteScroll>
  );
};

export default Main;
