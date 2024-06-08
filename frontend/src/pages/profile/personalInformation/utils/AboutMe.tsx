import { ABOUT_UPDATE_VALUE } from "../../../../services/types/redux";
import { useEffect, useState } from "react";
import { Card, MyDialog, Form } from "../../../../components";
import { useAppSelector, useAppDispatch } from "../../../../hooks/redux";
import { RootState } from "../../../../store/configureStore";
import { asyncLoadText } from "../../../../services/actions/translations";
import { TextListClass } from "../../../../utils/textContent";
import { Divider, IconButton, Grid, Button } from "@mui/material";
import ProfileService from "../../../../services/api/profile";
import LongText from "../../../../components/view/LongText";
import EditIcon from "@mui/icons-material/Edit";
import { AboutFormType } from "../../../../services/types/about";
import "../../../../assets/pages/profile/personalInfo.scss";
import { handleSubmit } from "../../../../services/actions/about";

const AboutMeUpdate: React.FC<any> = ({
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
  const helperAsync = async () => {
    const result = await asyncLoadText(LanguageId, [31, 1650]);
    Array.isArray(result) && setText(new TextListClass(result));
  };
  useEffect(() => {
    helperAsync();
  }, [LanguageId]);
  useEffect(() => {
    dispatch({
      type: ABOUT_UPDATE_VALUE,
      payload: { key: "about", value },
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
          <Form reduxConnectionString={"about"} formElements={AboutFormType} />
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
                console.log(await dispatch(handleSubmit()));

                if (await dispatch(handleSubmit())) {
                  fetchData();
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

const AboutMe: React.FC<{ user_id: number }> = ({ user_id }) => {
  const [text, setText] = useState<TextListClass | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const LanguageId = useAppSelector(
    (state: RootState) => state.languages.LanguageId
  );
  const user = useAppSelector((state: RootState) => state.auth?.user?.user);
  const token = useAppSelector((state: RootState) => state.auth?.token);
  const helperAsync = async () => {
    const result = await asyncLoadText(LanguageId, [1654]);
    Array.isArray(result) && setText(new TextListClass(result));
  };
  const fetchData = async () => {
    try {
      const result = await ProfileService.getAboutMe({ user_id }, token);
      setContent(result?.data?.about);
    } catch {}
  };

  useEffect(() => {
    helperAsync();
    fetchData();
  }, [LanguageId]);
  return (
    <Card>
      <div className="personal-information profile-card">
        <div className=" profile-card__header">
          {text?.getText(1654)}
          <MyDialog
            Element={AboutMeUpdate}
            closeProtection={false}
            Button={() =>
              content &&
              user === user_id && (
                <IconButton className=" profile-card__header__btn">
                  <EditIcon />
                </IconButton>
              )
            }
            defaultWH={[750, 650]}
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
          <div className="about-me">
            <LongText text={content} />
          </div>
        </Grid>
      </div>
    </Card>
  );
};

export default AboutMe;
