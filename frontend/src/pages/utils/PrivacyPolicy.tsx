import React from "react";
import { useLocation } from "react-router-dom";
import { Dialog } from "@mui/material";
import Main from "./policy/Main";
import history from "../../routers/history";

const PrivacyPolicy: React.FC = () => {
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const handleClose = (value: string) => {
    setOpen(false);
    history.push(
      String(location.pathname.split("/").slice(0, -1)).replace(/,/g, "/")
    );
  };
  return (
    <Dialog
      onClose={handleClose}
      open={open}
      sx={{
        ".MuiPaper-elevation": {
          overflow: "visible",
        },
        ".policy": {
          ".policy__body": {
            maxHeight: window.innerHeight - 300,
          },
        },
      }}
    >
      <Main />
    </Dialog>
  );
};

export default PrivacyPolicy;
