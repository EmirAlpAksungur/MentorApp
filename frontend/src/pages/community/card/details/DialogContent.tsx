import React from "react";
import { Box, Divider } from "@mui/material";
import DialogHeader from "./DialogHeader";
import DialogBody from "./DialogBody";
import { ElementProps } from "../../../../components/dialog/Main";
import "../../../../assets/pages/community/userDetails.scss";

const Main: React.FC<ElementProps> = (props) => {
  return (
    <Box className="user-details-container">
      <DialogHeader
        photo={props?.photo}
        handleClose={props?.handleClose}
        first_name={props?.user?.first_name}
        last_name={props?.user?.last_name}
        profession={props?.profession}
        receiver={props?.user?.id}
      />
      <Divider className="user-details-container__divider" />
      <DialogBody
        about={props?.about}
        knownSkills={props?.knownSkills}
        unKnownSkills={props?.unKnownSkills}
        languages={props?.languages}
        location={props?.location}
        university={props?.university}
      />
    </Box>
  );
};

export default React.memo(Main);
