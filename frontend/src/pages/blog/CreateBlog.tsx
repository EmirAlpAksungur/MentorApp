import React, { useEffect, useState } from "react";
import { Grid, Button } from "@mui/material";
import { Form } from "../../components";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { asyncLoadText } from "../../services/actions/translations";
import { RootState } from "../../store/configureStore";

import { TranslatedTextType } from "../../services/types/translations";

import { BlogFormType } from "../../services/types/blog";
import { handleSubmit, handleNew } from "../../services/actions/blog";
import { updateFormValue } from "../../services/actions/form";
import { uuidv4 } from "../../utils/uuidGenerator";
const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState<TranslatedTextType[]>([]);
  const isNew = useAppSelector((state: RootState) => state.blog.page);
  const LanguageId = useAppSelector(
    (state: RootState) => state.languages.LanguageId
  );
  const helperAsync = async () => {
    const result = await asyncLoadText(LanguageId, [31]);
    Array.isArray(result) && setText(result);
  };
  useEffect(() => {
    helperAsync();
  }, [LanguageId]);

  const handleUpdate = () => {
    dispatch(handleSubmit());
  };

  const handleSave = () => {
    dispatch(updateFormValue("BLOG", "uuid", uuidv4()));
    handleUpdate();
  };

  return (
    <Grid
      container
      id="blog-config"
      justifyContent={"flex-end"}
      className="blog-container__body__profile__create-blog"
    >
      <Grid
        item
        xs={12}
        className="blog-container__body__profile__create-blog__form"
      >
        <Form reduxConnectionString={"blog"} formElements={BlogFormType} />
      </Grid>
      <Grid item>
        {isNew ? (
          <Button
            variant="contained"
            className="blog-container__body__profile__create-blog__btn"
            onClick={handleSave}
          >
            {text.find((e) => e?.TextContentId === 31)?.Translations}
          </Button>
        ) : (
          <>
            <Button
              variant="contained"
              className="blog-container__body__profile__create-blog__btn"
              onClick={() => {
                dispatch(handleNew());
              }}
            >
              new
            </Button>
            <Button
              variant="contained"
              className="blog-container__body__profile__create-blog__btn"
              onClick={handleUpdate}
            >
              Update
            </Button>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default React.memo(Main);
