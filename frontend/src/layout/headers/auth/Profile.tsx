import React, { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import { Avatar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { asyncLoadText } from "../../../services/actions/translations";
import { TranslatedTextType } from "../../../services/types/translations";
import { routeToUrl } from "../../../routers/utils";
import { RootState } from "../../../store/configureStore";
import { logOut } from "../../../services/actions/auth";
import { MyMenu } from "../../../components";

const Element: React.FC = () => {
  const first_name = useAppSelector(
    (state: RootState) => state.auth?.user?.first_name
  );
  const last_name = useAppSelector(
    (state: RootState) => state.auth?.user?.last_name
  );
  const photo = useAppSelector((state: RootState) => state.auth?.user?.photo);
  function stringToColor(string: string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")?.[0]?.[0]}${name.split(" ")?.[1]?.[0]}`,
    };
  }

  return (
    <Avatar
      src={`data:image/jpeg;base64,${photo}`}
      {...stringAvatar(first_name + " " + last_name)}
    />
  );
};

const Main: React.FC = () => {
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

  return (
    <MyMenu Element={Element}>
      <MenuItem
        className={"app-header__mobile-menu__menu-item"}
        onClick={() => routeToUrl("/profile")}
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
