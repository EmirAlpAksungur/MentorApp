import { KNOWNSKILLS_UPDATE_VALUE } from "../../../../services/types/redux";
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
import KnownSkill from "../../../../components/view/KnownSkill";
import { KnownSkillsFormType } from "../../../../services/types/knownSkills";
import { handleSubmit } from "../../../../services/actions/knownSkills";
import { loadUser } from "../../../../services/actions/login";
const KnownSkillsUpdate: React.FC<any> = ({
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
      type: KNOWNSKILLS_UPDATE_VALUE,
      payload: { key: "knownSkills", value },
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
            reduxConnectionString={"knownSkills"}
            formElements={KnownSkillsFormType}
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
                console.log(await dispatch(handleSubmit()));

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

const SkillsCard: React.FC<{ user_id: number }> = ({ user_id }) => {
  const [text, setText] = useState<TextListClass | null>(null);
  const [content, setContent] = useState<number[] | null>(null);
  const LanguageId = useAppSelector(
    (state: RootState) => state.languages.LanguageId
  );
  const user = useAppSelector((state: RootState) => state.auth?.user?.user);
  const token = useAppSelector((state: RootState) => state.auth?.token);
  const helperAsync = async () => {
    const result = await asyncLoadText(LanguageId, [1665]);
    Array.isArray(result) && setText(new TextListClass(result));
  };
  const fetchData = async () => {
    try {
      console.log({ user_id });

      console.log(token);

      const result = await ProfileService.getSkills({ user_id }, token);
      setContent(result.data?.knownSkills);
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
          {text?.getText(1665)}
          <MyDialog
            Element={KnownSkillsUpdate}
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
        <Grid
          container
          className="personal-information__body profile-card__body"
        >
          <div className="about-me">
            <KnownSkill knownSkills={content} />
          </div>
        </Grid>
      </div>
    </Card>
  );
};

export default SkillsCard;
