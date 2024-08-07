import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { asyncLoadText } from "../../../services/actions/translations";
import { TranslatedTextType } from "../../../services/types/translations";
import { routeToUrl } from "../../../routers/utils";
import { RootState } from "../../../store/configureStore";
import { logOut } from "../../../services/actions/auth";
import { MyMenu, MyAvatar } from "../../../components";

const Element: React.FC = () => {
  const first_name = useAppSelector(
    (state: RootState) => state.auth?.user?.first_name
  );
  const last_name = useAppSelector(
    (state: RootState) => state.auth?.user?.last_name
  );
  const photo = useAppSelector((state: RootState) => state.auth?.user?.photo);

  return (
    <MyAvatar first_name={first_name} last_name={last_name} photo={photo} />
  );
};

const Main: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [text, setText] = useState<TranslatedTextType[]>([]);
  const LanguageId = useAppSelector(
    (state: RootState) => state.languages.LanguageId
  );

  const helperAsync = async () => {
    const result = await asyncLoadText(LanguageId, [25, 26]);
    Array.isArray(result) && setText(result);
  };
  useEffect(() => {
    helperAsync();
  }, [LanguageId]);
  const isActive = (path: string) => {
    if (location.pathname.split("/")?.[1] === path)
      return "app-header__mobile-menu__menu-item__active";
    return "";
  };
  return (
    <MyMenu Element={Element}>
      <MenuItem
        className={"app-header__mobile-menu__menu-item " + isActive("profile")}
        onClick={() => routeToUrl("/profile/personal-information")}
      >
        {text.find((e) => e?.TextContentId === 25)?.Translations}
      </MenuItem>
      <MenuItem
        className={"app-header__mobile-menu__menu-item"}
        onClick={() => {
          dispatch(logOut());
        }}
      >
        {text.find((e) => e?.TextContentId === 26)?.Translations}
      </MenuItem>
    </MyMenu>
  );
};

export default React.memo(Main);
