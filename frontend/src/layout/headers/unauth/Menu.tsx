import React, { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useAppSelector } from "../../../hooks/redux";
import { asyncLoadText } from "../../../services/actions/translations";
import { TranslatedTextType } from "../../../services/types/translations";
import { routeToUrl } from "../../../routers/utils";
import { RootState } from "../../../store/configureStore";

import { MyMenu } from "../../../components";
import { Divider } from "@mui/material";
interface ElementType {
  isOpen: boolean;
}

const Element: React.FC<ElementType> = ({ isOpen }) => {
  return isOpen ? (
    <MenuOpenIcon fontSize="large" />
  ) : (
    <MenuIcon fontSize="large" />
  );
};
export interface MenuItemHelperType {
  //   Icon: React.FC;
  text: string;
  route: string;
}

const MenuItemHelper: React.FC<MenuItemHelperType> = ({
  //   Icon,
  text,
  route,
}) => {
  return (
    <MenuItem
      className={"app-header__mobile-menu__menu-item"}
      onClick={() => routeToUrl(route)}
    >
      {/* <Icon /> */}
      {text}
    </MenuItem>
  );
};

const Main: React.FC = () => {
  const [text, setText] = useState<TranslatedTextType[]>([]);
  const LanguageId = useAppSelector(
    (state: RootState) => state.languages.LanguageId
  );

  const helperAsync = async () => {
    const result = await asyncLoadText(LanguageId, [1, 2, 3, 4, 5]);
    Array.isArray(result) && setText(result);
  };
  useEffect(() => {
    helperAsync();
  }, [LanguageId]);

  return (
    <MyMenu Element={Element}>
      <MenuItemHelper
        text={text.find((e) => e?.TextContentId === 4)?.Translations!}
        route="log-in"
      />
      <MenuItemHelper
        text={text.find((e) => e?.TextContentId === 5)?.Translations!}
        route="sign-up"
      />
      <Divider />
      <MenuItemHelper
        text={text.find((e) => e?.TextContentId === 1)?.Translations!}
        route="log-in"
      />
      <MenuItemHelper
        text={text.find((e) => e?.TextContentId === 2)?.Translations!}
        route="blog"
      />
      <MenuItemHelper
        text={text.find((e) => e?.TextContentId === 3)?.Translations!}
        route="download"
      />
    </MyMenu>
  );
};

export default React.memo(Main);
