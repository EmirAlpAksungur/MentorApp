import React from "react";
import { Box, Grid } from "@mui/material";

import AboutMe from "../../../profile/personalInformation/utils/AboutMe";
import General from "../../../profile/personalInformation/utils/General";
import SkillsCard from "../../../profile/personalInformation/utils/SkillsCard";
import UnknownSkillsCard from "../../../profile/personalInformation/utils/UnknownSkills";
import Languages from "../../../profile/personalInformation/utils/Languages";
interface DialogBodyProps {
  user: {
    id: number;
  };
}

const Main: React.FC<DialogBodyProps> = ({ user }) => {
  console.log(user);

  return (
    <Box className="user-details-container__body">
      <Grid container rowGap={3}>
        <Grid item xs={12}>
          <AboutMe user_id={user?.id} />
        </Grid>
        <Grid item xs={12}>
          <General user_id={user?.id} />
        </Grid>
        <Grid item xs={12}>
          <SkillsCard user_id={user?.id} />
        </Grid>
        <Grid item xs={12}>
          <UnknownSkillsCard user_id={user?.id} />
        </Grid>
        <Grid item xs={12}>
          <Languages user_id={user?.id} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default React.memo(Main);
