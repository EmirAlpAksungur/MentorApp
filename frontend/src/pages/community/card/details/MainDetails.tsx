import React from "react";
import { IconButton } from "@mui/material";
import { MyDialog } from "../../../../components";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DialogContent from "./DialogContent";
import { CardPropType } from "../Card";
const Button: React.FC = () => {
  return (
    <IconButton className="community-container__main-box__item__body__header__btn">
      <InfoOutlinedIcon fontSize="large" />
    </IconButton>
  );
};

const Main: React.FC<CardPropType> = (props) => {
  return (
    <div>
      <MyDialog
        Element={DialogContent}
        closeProtection={false}
        Button={() => <Button />}
        defaultWH={[750, 600]}
        defaultOpen={false}
        hideBackdrop={false}
        {...props}
      />
    </div>
  );
};

export default React.memo(Main);
