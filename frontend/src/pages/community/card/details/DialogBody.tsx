import React from "react";
import { Box } from "@mui/material";
import LongText from "../../../../components/view/LongText";
interface DialogBodyProps {
  about: string;
  knownSkills: number[];
  unKnownSkills: String[];
  languages: number[];
  location: number;
  university: number[];
}

const Main: React.FC<DialogBodyProps> = (props) => {
  return (
    <Box className="user-details-container__body">
      <LongText text={props?.about} />
    </Box>
  );
};

export default React.memo(Main);
