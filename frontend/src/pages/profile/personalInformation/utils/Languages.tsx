import { PROFILELANGUAGES_UPDATE_VALUE } from "../../../../services/types/redux";
import { useEffect, useState } from "react";
import { Card, MyDialog, Form } from "../../../../components";
import { useAppSelector, useAppDispatch } from "../../../../hooks/redux";
import { RootState } from "../../../../store/configureStore";
import { asyncLoadText } from "../../../../services/actions/translations";
import { TextListClass } from "../../../../utils/textContent";
import { Divider, IconButton, Grid, Button } from "@mui/material";
import ProfileService from "../../../../services/api/profile";
import EditIcon from "@mui/icons-material/Edit";
import "../../../../assets/pages/profile/personalInfo.scss";
import Lanugages from "../../../../components/view/Lanugages";

import { handleSubmit } from "../../../../services/actions/profileLanguages";
import {
  LanguageType,
  LanguagesFormType,
} from "../../../../services/types/languages";
import { loadUser } from "../../../../services/actions/login";
const LanguageUpdate: React.FC<any> = ({
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
      type: PROFILELANGUAGES_UPDATE_VALUE,
      payload: { key: "languages", value },
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
            reduxConnectionString={"profileLanguages"}
            formElements={LanguagesFormType}
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

const LanguageCard: React.FC<{ user_id: number }> = ({ user_id }) => {
  const [text, setText] = useState<TextListClass | null>(null);
  const [content, setContent] = useState<LanguageType[] | null>(null);
  const LanguageId = useAppSelector(
    (state: RootState) => state.languages.LanguageId
  );
  const user = useAppSelector((state: RootState) => state.auth?.user?.user);
  const token = useAppSelector((state: RootState) => state.auth?.token);
  const helperAsync = async () => {
    const result = await asyncLoadText(LanguageId, [1634]);
    Array.isArray(result) && setText(new TextListClass(result));
  };
  const fetchData = async () => {
    try {
      const result = await ProfileService.getProfileLanguages(
        { user_id },
        token
      );
      console.log(result);

      setContent(result.data?.languages);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    helperAsync();
    fetchData();
  }, [LanguageId]);
  return (
    <Card>
      <div className="profile-languages profile-card">
        <div className="profile-card__header">
          {text?.getText(1634)}
          <MyDialog
            Element={LanguageUpdate}
            closeProtection={false}
            Button={() =>
              content &&
              user === user_id && (
                <IconButton className=" profile-card__header__btn">
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
        <Grid container className="profile-languages__body profile-card__body">
          <Lanugages languages={content} />
        </Grid>
      </div>
    </Card>
  );
};

export default LanguageCard;
