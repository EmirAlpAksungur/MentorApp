import React, { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { RootState } from "../../store/configureStore";
import { changeNotification } from "../../services/actions/notification";
import { TranslatedTextType } from "../../services/types/translations";
import { asyncLoadText } from "../../services/actions/translations";

import "../../assets/components/notification/notification.scss";

export default function SimpleSnackbar() {
  const dispatch = useAppDispatch();
  const [text, setText] = useState<TranslatedTextType[]>([]);

  const NotificationCode = useAppSelector(
    (state: RootState) => state.notification.NotificationCode
  );
  const NotificationText = useAppSelector(
    (state: RootState) => state.notification.NotificationText
  );

  const LanguageId = useAppSelector(
    (state: RootState) => state.languages.LanguageId
  );
  console.log(text);

  const helperAsync = async () => {
    console.log(NotificationText);
    if (typeof NotificationText === "number") {
      const result = await asyncLoadText(LanguageId, [NotificationText]);
      console.log(result);
      Array.isArray(result) && setText(result);
    }
  };
  useEffect(() => {
    helperAsync();
  }, [LanguageId, NotificationText]);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(
      changeNotification({
        NotificationCode: false,
        NotificationText: false,
      })
    );
  };

  const action = (
    <IconButton aria-label="close" color="inherit" onClick={handleClose}>
      <CloseIcon />
    </IconButton>
  );

  return (
    <div className="notification-container">
      <Snackbar
        open={NotificationCode}
        autoHideDuration={12000}
        onClose={handleClose}
        message={text[0]?.Translations}
        action={action}
        className={`notification-container__${NotificationCode}`}
      />
    </div>
  );
}
