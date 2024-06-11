import { useAppSelector } from "../../../hooks/redux";
import { RootState } from "../../../store/configureStore";

import { Grid } from "@mui/material";
import AboutMe from "./utils/AboutMe";
import General from "./utils/General";
import SkillsCard from "./utils/SkillsCard";

const Main = () => {
  const user = useAppSelector((state: RootState) => state.auth?.user?.user);

  return (
    <Grid container rowGap={3}>
      <Grid item xs={12}>
        <AboutMe user_id={user} />
      </Grid>
      <Grid item xs={12}>
        <General user_id={user} />
      </Grid>
      <Grid item xs={12}>
        <SkillsCard user_id={user} />
      </Grid>
    </Grid>
  );
};

export default Main;
