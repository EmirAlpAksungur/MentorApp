import React from "react";
import { Box } from "@mui/material";
import LongText from "../../../../components/view/LongText";
import University from "../../../../components/view/University";
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
      <University university={props?.university} />
    </Box>
  );
};

export default React.memo(Main);
