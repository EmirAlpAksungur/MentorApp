import React from "react";
import $ from "jquery";
import { IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import "../../../assets/layout/header.scss";
const ThemeSelect: React.FC = () => {
  const animateButton = (selector: string, topValue: string) => {
    $(selector).animate({ top: topValue }, 500);
  };

  const changeTheme = () => {
    const body = $("body");
    const bodyClass = body.attr("class");
    const isLightTheme = bodyClass === "theme-light";

    body.toggleClass("theme-light theme-dark");

    const darkModeTop = isLightTheme ? "0px" : "40px";
    const lightModeTop = isLightTheme ? "-40px" : "0px";

    animateButton(".app-header__left__btn-theme__dark-mode", darkModeTop);
    animateButton(".app-header__left__btn-theme__light-mode", lightModeTop);
  };
  return (
    <IconButton onClick={changeTheme} className="app-header__left__btn-theme">
      <DarkModeIcon className="app-header__left__btn-theme__dark-mode" />
      <LightModeIcon className="app-header__left__btn-theme__light-mode" />
    </IconButton>
  );
};

export default React.memo(ThemeSelect);
