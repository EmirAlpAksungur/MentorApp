import React from "react";
import { Box } from "@mui/material";
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
        location={props?.location}
      />
      <DialogBody user={props?.user} />
    </Box>
  );
};

export default React.memo(Main);
