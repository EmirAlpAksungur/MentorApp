import {
  PERSONALINFO_UPDATE_VALUE,
  PERSONALINFO_FILL_VALUE,
} from "../../../../services/types/redux";
import { useEffect, useState } from "react";
import { Card, MyDialog, Form } from "../../../../components";
import { useAppSelector, useAppDispatch } from "../../../../hooks/redux";
import { RootState } from "../../../../store/configureStore";
import { asyncLoadText } from "../../../../services/actions/translations";
import { TextListClass } from "../../../../utils/textContent";
import { Divider, IconButton, Grid, Button } from "@mui/material";
import ProfileService from "../../../../services/api/profile";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EditIcon from "@mui/icons-material/Edit";
import {
  PersonalInfoType,
  PersonalInfoFormType,
} from "../../../../services/types/personalInfo";
import Location from "../../../../components/view/Location";
import Age from "../../../../components/view/Age";
import { handleSubmit } from "../../../../services/actions/personalInfo";
import "../../../../assets/pages/profile/personalInfo.scss";
import { loadUser } from "../../../../services/actions/login";

const GeneralUpdate: React.FC<any> = ({
  value,
  fetchData,
  handleClose,
  width,
  height,
}) => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState<TextListClass | null>(null);
  const LanguageId = useAppSelector(
    (state: RootState) => state.languages.LanguageId
  );
  const token = useAppSelector((state: RootState) => state.auth?.token);
  const helperAsync = async () => {
    const result = await asyncLoadText(LanguageId, [31, 1650]);
    Array.isArray(result) && setText(new TextListClass(result));
  };
  useEffect(() => {
    helperAsync();
  }, [LanguageId]);
  useEffect(() => {
    dispatch({
      type: PERSONALINFO_FILL_VALUE,
      payload: value,
    });
  }, []);
  return (
    <div
      className="about-me-update"
      style={{
        width,
        height,
      }}
    >
      <Card>
        <div
          className="update-body about-me-update__body"
          style={{
            width,
            height,
          }}
        >
          <Form
            reduxConnectionString={"personalInfo"}
            formElements={PersonalInfoFormType}
          />
          <div className="update-body__btn-group">
            <Button
              onClick={handleClose}
              variant="outlined"
              className="update-body__btn-group__cancel"
            >
              {text?.getText(1650)}
            </Button>
            <Button
              variant="contained"
              className="update-body__btn-group__save"
              onClick={async () => {
                if (await dispatch(handleSubmit())) {
                  fetchData();
                  dispatch(loadUser(token));
                  handleClose();
                }
              }}
            >
              {text?.getText(31)}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

const General: React.FC<{ user_id: number }> = ({ user_id }) => {
  const [text, setText] = useState<TextListClass | null>(null);
  const [content, setContent] = useState<PersonalInfoType | null>(null);
  const LanguageId = useAppSelector(
    (state: RootState) => state.languages.LanguageId
  );
  const user = useAppSelector((state: RootState) => state.auth?.user?.user);
  const token = useAppSelector((state: RootState) => state.auth?.token);

  const helperAsync = async () => {
    const result = await asyncLoadText(
      LanguageId,
      [1655, 1656, 1657, 1658, 1659, 1660, 1661, 1662]
    );
    Array.isArray(result) && setText(new TextListClass(result));
  };

  const fetchData = async () => {
    try {
      const result = await ProfileService.getPersonalInfo({ user_id }, token);
      console.log(result);
      setContent(result?.data);
    } catch {}
  };

  useEffect(() => {
    helperAsync();
    fetchData();
  }, [LanguageId]);

  return (
    <Card>
      <div className="personal-information profile-card">
        <div className="profile-card__header">
          {text?.getText(1655)}
          <MyDialog
            Element={GeneralUpdate}
            closeProtection={false}
            Button={() =>
              content &&
              user === user_id && (
                <IconButton className="profile-card__header__btn">
                  <EditIcon />
                </IconButton>
              )
            }
            defaultWH={[550, 450]}
            defaultOpen={false}
            hideBackdrop={false}
            value={content}
            fetchData={fetchData}
          />
        </div>
        <Divider className="profile-card__divider" />
        <Grid
          container
          className="personal-information__body profile-card__body"
        >
          <div className="general">
            <div className="general__box">
              <div className="general__box__item">
                <div className="general__box__item__header">
                  {text?.getText(1656)}
                </div>
                <div className="general__box__item__content">
                  {content?.first_name + " " + content?.last_name}
                </div>
              </div>
              <div className="general__box__item">
                <div className="general__box__item__header">
                  {text?.getText(1659)}
                </div>
                <div className="general__box__item__content">
                  {content?.profession ? content?.profession : "-"}
                </div>
              </div>
            </div>
            <Divider className="general__divider" />
            <div className="general__box">
              <div className="general__box__item">
                <div className="general__box__item__header">
                  {text?.getText(1658)}
                </div>
                <div className="general__box__item__content">
                  {content?.email}
                </div>
              </div>
              <div className="general__box__item">
                <div className="general__box__item__header">
                  {text?.getText(1660)}
                </div>
                <div className="general__box__item__content">
                  {content?.dateOfBirth && content?.dateOfBirth !== 0 ? (
                    <Age timestamp={content?.dateOfBirth} />
                  ) : (
                    "-"
                  )}
                </div>
              </div>
            </div>
            <Divider className="general__divider" />
            <div className="general__box">
              <div className="general__box__item">
                <div className="general__box__item__header">
                  {text?.getText(1657)}
                </div>
                <div className="general__box__item__content">
                  {content?.nationality ? (
                    <Location location={content?.nationality} />
                  ) : (
                    "-"
                  )}
                </div>
              </div>
              <div className="general__box__item">
                <div className="general__box__item__header">
                  {text?.getText(1661)}
                </div>
                <div className="general__box__item__content">
                  {content?.location ? (
                    <Location location={content?.location} />
                  ) : (
                    "-"
                  )}
                </div>
              </div>
            </div>
            <Divider className="general__divider" />
            <div className="general__box">
              <div className="general__box__item">
                <div className="general__box__item__header">
                  {text?.getText(1662)}
                </div>
                <div className="general__box__item__content">
                  {content?.twitter && (
                    <IconButton
                      className="profile-container__box__body__left__social__btn"
                      onClick={() => {
                        window.open(content?.twitter!, "_blank");
                      }}
                    >
                      <XIcon />
                    </IconButton>
                  )}
                  {content?.github && (
                    <IconButton
                      className="profile-container__box__body__left__social__btn"
                      onClick={() => {
                        window.open(content?.github!, "_blank");
                      }}
                    >
                      <GitHubIcon />
                    </IconButton>
                  )}
                  {content?.linkedin && (
                    <IconButton
                      className="profile-container__box__body__left__social__btn"
                      onClick={() => {
                        window.open(content?.linkedin!, "_blank");
                      }}
                    >
                      <LinkedInIcon />
                    </IconButton>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </div>
    </Card>
  );
};

export default General;
