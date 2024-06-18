import { UNKNOWNSKILLS_UPDATE_VALUE } from "../../../../services/types/redux";
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
import UnKnownSkill from "../../../../components/view/UnKnownSkill";
import {
  UnKnownSkillsFormType,
  UnKnownSkillsType,
} from "../../../../services/types/unKnownSkills";
import { handleSubmit } from "../../../../services/actions/unKnownSkills";
const UnKnownSkillsUpdate: React.FC<any> = ({
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
      type: UNKNOWNSKILLS_UPDATE_VALUE,
      payload: { key: "unKnownSkills", value },
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
            reduxConnectionString={"unKnownSkills"}
            formElements={UnKnownSkillsFormType}
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

const SkillsCard: React.FC<{ user_id: number }> = ({ user_id }) => {
  const [text, setText] = useState<TextListClass | null>(null);
  const [content, setContent] = useState<UnKnownSkillsType[] | null>(null);
  const LanguageId = useAppSelector(
    (state: RootState) => state.languages.LanguageId
  );
  const user = useAppSelector((state: RootState) => state.auth?.user?.user);
  const token = useAppSelector((state: RootState) => state.auth?.token);
  const helperAsync = async () => {
    const result = await asyncLoadText(LanguageId, [1666]);
    Array.isArray(result) && setText(new TextListClass(result));
  };
  const fetchData = async () => {
    try {
      const result = await ProfileService.getUnknownSkills({ user_id }, token);
      setContent(result.data?.unKnownSkills);
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
      <div className="unknown-skills profile-card">
        <div className="profile-card__header">
          {text?.getText(1666)}
          <MyDialog
            Element={UnKnownSkillsUpdate}
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
        <Grid container className="unknown-skills__body profile-card__body">
          <UnKnownSkill unKnownSkills={content} />
        </Grid>
      </div>
    </Card>
  );
};

export default SkillsCard;
