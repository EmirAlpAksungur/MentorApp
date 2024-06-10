import React from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { RootState } from "../../store/configureStore";
import LocationService from "../../services/api/location";
const Location: React.FC<{ location: number }> = ({ location }) => {
  const [text, setText] = React.useState<string>("");
  const token = useAppSelector((state: RootState) => state.auth?.token);
  const LanguageId = useAppSelector(
    (state: RootState) => state.languages.LanguageId
  );
  const asyncHelper = async () => {
    try {
      let res = await LocationService.getCityDetailList(
        location,
        LanguageId,
        token
      );
      console.log(res);
      setText(
        res.data?.CountryId?.TextContentId?.translation + "/" + res.data?.name
      );
    } catch {}
  };
  React.useEffect(() => {
    asyncHelper();
  }, []);
  return text;
};

export default Location;
