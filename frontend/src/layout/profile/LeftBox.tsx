import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IconButton, Button } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useAppSelector } from "../../hooks/redux";
import { RootState } from "../../store/configureStore";
import { ImageSelect } from "../../components";
import { routeToUrl } from "../../routers/utils";
import { asyncLoadText } from "../../services/actions/translations";

import { TextListClass } from "../../utils/textContent";
const ButtonGroup = () => {
  const location = useLocation();
  const [text, setText] = useState<TextListClass | null>(null);
  const LanguageId = useAppSelector(
    (state: RootState) => state.languages.LanguageId
  );
  const handleBtnClick = (url: string) => {
    routeToUrl(url);
  };

  const helperAsync = async () => {
    const result = await asyncLoadText(LanguageId, [1629, 1630, 1631]);
    Array.isArray(result) && setText(new TextListClass(result));
  };

  useEffect(() => {
    helperAsync();
  }, [LanguageId]);
  const isActive = (path: string) => {
    if (location.pathname.split("/").pop() === path)
      return "profile-container__box__body__left__buttons__btn__active";
    return "";
  };
  return (
    <div className="profile-container__box__body__left__buttons">
      <Button
        className={
          "profile-container__box__body__left__buttons__btn " +
          isActive("personal-information")
        }
        onClick={() => {
          handleBtnClick("/profile/personal-information");
        }}
      >
        <PersonOutlinedIcon /> {text?.getText(1629)}
      </Button>
      <Button
        className={
          "profile-container__box__body__left__buttons__btn " +
          isActive("change-password")
        }
        onClick={() => {
          handleBtnClick("/profile/change-password");
        }}
      >
        <HttpsOutlinedIcon /> {text?.getText(1630)}
      </Button>
      <Button
        className={
          "profile-container__box__body__left__buttons__btn " +
          isActive("settings")
        }
        onClick={() => {
          handleBtnClick("/profile/settings");
        }}
      >
        <SettingsOutlinedIcon /> {text?.getText(1631)}
      </Button>
    </div>
  );
};

const LeftBox = () => {
  const photo = useAppSelector((state: RootState) => state.auth.user?.photo);
  const first_name = useAppSelector(
    (state: RootState) => state.auth.user?.first_name
  );
  const last_name = useAppSelector(
    (state: RootState) => state.auth.user?.last_name
  );
  const profession = useAppSelector(
    (state: RootState) => state.auth.user?.profession
  );
  const twitter = useAppSelector(
    (state: RootState) => state.auth.user?.twitter
  );
  const github = useAppSelector((state: RootState) => state.auth.user?.github);
  const linkedin = useAppSelector(
    (state: RootState) => state.auth.user?.linkedin
  );

  return (
    <>
      <div className="profile-container__box__body__left__header">
        <IconButton className="profile-container__box__body__left__header__btn">
          <MoreVertIcon />
        </IconButton>
      </div>
      <div className="profile-container__box__body__left__img">
        <ImageSelect value={photo} />
      </div>
      <div className="profile-container__box__body__left__name">
        {first_name} {last_name}
      </div>
      <div className="profile-container__box__body__left__proffession">
        {profession}
      </div>
      <div className="profile-container__box__body__left__social">
        {twitter && (
          <IconButton
            className="profile-container__box__body__left__social__btn"
            onClick={() => {
              window.open(twitter, "_blank");
            }}
          >
            <XIcon />
          </IconButton>
        )}
        {github && (
          <IconButton
            className="profile-container__box__body__left__social__btn"
            onClick={() => {
              window.open(github, "_blank");
            }}
          >
            <GitHubIcon />
          </IconButton>
        )}
        {linkedin && (
          <IconButton
            className="profile-container__box__body__left__social__btn"
            onClick={() => {
              window.open(linkedin, "_blank");
            }}
          >
            <LinkedInIcon />
          </IconButton>
        )}
      </div>
      <ButtonGroup />
    </>
  );
};

export default LeftBox;
