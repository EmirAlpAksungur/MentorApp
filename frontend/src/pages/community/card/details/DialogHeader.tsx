import React, { useState, useEffect } from "react";
import { Grid, Avatar, IconButton, Button, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { RootState } from "../../../../store/configureStore";
import { asyncLoadText } from "../../../../services/actions/translations";
import { useAppSelector, useAppDispatch } from "../../../../hooks/redux";
import { TranslatedTextType } from "../../../../services/types/translations";
import { sendMessage } from "../../../../services/actions/chat";
import { follow } from "../../../../services/actions/profile";
import LocationService from "../../../../services/api/location";
interface HeaderProps {
  photo: string;
  handleClose: Function;
  first_name: String;
  last_name: String;
  profession: string;
  receiver: number;
  location: number;
}

const Main: React.FC<HeaderProps> = (props) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state: RootState) => state.auth.token);

  const [location, setLocaton] = useState<any>({});
  const [text, setText] = useState<TranslatedTextType[]>([]);
  const LanguageId = useAppSelector(
    (state: RootState) => state.languages.LanguageId
  );
  const userId = useAppSelector((state: RootState) => state.auth.user?.user);

  const handleSendMessage = async () => {
    dispatch(sendMessage(userId, props.receiver));
  };

  const handleFollow = async () => {
    dispatch(follow(props?.receiver));
  };

  const helperTextLoad = async () => {
    try {
      const result = await asyncLoadText(LanguageId, [34, 1515]);
      Array.isArray(result) && setText(result);
    } catch (err) {
      console.log(err);
    }
  };
  const helperLocationLoad = async () => {
    try {
      const result = await LocationService.getCityDetailList(
        props?.location,
        LanguageId,
        token
      );
      console.log(result);

      setLocaton(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    helperTextLoad();
    helperLocationLoad();
  }, [LanguageId]);

  return (
    <>
      <Grid
        container
        justifyContent={"space-between"}
        alignItems={"center"}
        className="user-details-container__header"
      >
        <Grid item>
          <Avatar
            src={`data:image/jpeg;base64,${props?.photo}`}
            className="user-details-container__header__img"
          />
        </Grid>
        <Grid item>
          <Typography className="user-details-container__header__name">
            {props?.first_name} {props?.last_name}
          </Typography>
          <Typography className="user-details-container__header__profession">
            {props?.profession}
          </Typography>
          <Typography className="user-details-container__header__profession">
            {location?.CountryId?.TextContentId?.translation} {" / "}
            {location?.name}
          </Typography>
        </Grid>
        <Grid item>
          <IconButton
            className="user-details-container__header__btn"
            onClick={() => {
              props.handleClose();
            }}
          >
            <CloseIcon className="user-details-container__header__btn__icon" />
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            className="user-details-container__header__btn-follow"
            onClick={handleFollow}
          >
            {text.find((e) => e?.TextContentId === 1515)?.Translations}
          </Button>
          <Button
            variant="outlined"
            className="user-details-container__header__btn-follow"
            onClick={handleSendMessage}
          >
            {text.find((e) => e?.TextContentId === 34)?.Translations}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default React.memo(Main);
