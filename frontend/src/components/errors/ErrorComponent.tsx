import React, { useState, useEffect, ReactNode } from "react";
import { Box } from "@mui/material";
import "../../assets/components/errors/errorComponent.scss";

interface ComponentErrorProps {
  errMsg: string;
  children: ReactNode;
}

const ComponentError: React.FC<ComponentErrorProps> = ({
  errMsg,
  children,
}) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = () => {
      setHasError(true);
    };

    const cleanup = () => {};

    window.addEventListener("error", errorHandler);

    return () => {
      window.removeEventListener("error", errorHandler);
      cleanup();
    };
  }, []);

  if (hasError) {
    return <Box className="component-error-box">{errMsg}</Box>;
  }

  return <>{children}</>;
};

export default ComponentError;
