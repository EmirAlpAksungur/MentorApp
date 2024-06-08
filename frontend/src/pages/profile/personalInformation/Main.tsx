import { useEffect, useState } from "react";
import { Card } from "../../../components";
import { useAppSelector, useAppDispatch } from "../../../hooks/redux";
import { RootState } from "../../../store/configureStore";
import { asyncLoadText } from "../../../services/actions/translations";
import { TextListClass } from "../../../utils/textContent";
import { Divider, Button, Grid } from "@mui/material";
import AboutMe from "./utils/AboutMe";

const Main = () => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState<TextListClass | null>(null);
  const LanguageId = useAppSelector(
    (state: RootState) => state.languages.LanguageId
  );
  const user = useAppSelector((state: RootState) => state.auth?.user?.user);
  const helperAsync = async () => {
    const result = await asyncLoadText(
      LanguageId,
      [31, 1630, 1644, 1645, 1646, 1647, 1648, 1649]
    );
    Array.isArray(result) && setText(new TextListClass(result));
  };

  useEffect(() => {
    helperAsync();
  }, [LanguageId]);
  return (
    <Grid container rowGap={3}>
      <Grid item xs={12}>
        <AboutMe user_id={user} />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <div className="personal-information profile-card">
            <div className=" profile-card__header">{text?.getText(1630)}</div>
            <Divider className="profile-card__divider" />
            <Grid
              container
              className="personal-information__body profile-card__body"
            ></Grid>
          </div>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Main;
