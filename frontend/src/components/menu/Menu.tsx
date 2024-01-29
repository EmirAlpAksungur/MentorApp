import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";

import "../../assets/components/menu/menu.scss";

interface ElementType {
  isOpen: boolean;
}

export interface MyMenuType {
  Element: React.FC<ElementType>;
  children: string | JSX.Element | JSX.Element[];
}

const MyMenu: React.FC<MyMenuType> = ({ Element, children }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState<boolean>(false);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };
  return (
    <React.Fragment>
      <Box onClick={handleClick}>
        <Element isOpen={open} />
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          className: "my-menu__pop-up",
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
          },
        }}
        className="my-menu"
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {children}
      </Menu>
    </React.Fragment>
  );
};

export default React.memo(MyMenu);
