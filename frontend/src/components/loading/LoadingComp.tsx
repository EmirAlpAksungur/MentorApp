import React from "react";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import "../../assets/components/loading.scss";

const LoadingComponent: React.FC = () => {
  return (
    <Box className="loading-component-box">
      <CircularProgress className="loading-component-box__progress" />
    </Box>
  );
};

export default React.memo(LoadingComponent);
