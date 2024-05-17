import React, { useEffect } from "react";
import { Box } from "@mui/material";

import "../../assets/components/view/longtext.scss";
import { uuidv4 } from "../../utils/uuidGenerator";
interface LongTextProps {
  university: number[];
}

const University: React.FC<LongTextProps> = ({ university }) => {
  const asyncLoadUniversity = async () => {};
  useEffect(() => {
    asyncLoadUniversity();
  }, []);
  return <Box className="university-view" key={uuidv4()}></Box>;
};

export default React.memo(University);
