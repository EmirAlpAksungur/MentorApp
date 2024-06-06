import React, { useState, useEffect } from "react";
import { MySelect } from "../../components";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import LanguagesService from "../../services/api/languages";
import { changeLanguage } from "../../services/actions/languages";
import { LanguagesStateType } from "../../services/reducers/languages";
import { RootState } from "../../store/configureStore";

const LangSelect: React.FC = () => {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state: RootState) => state.languages);
  const [languages, setLanguages] = useState<LanguagesStateType[]>([]);

  const handleChange = (val: number) => {
    const language = languages.find((e) => e?.LanguageId === val)!;
    dispatch(changeLanguage(language));
  };

  const fetchLanguges = async () => {
    try {
      let res = await LanguagesService.getLanguageList();
      setLanguages(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchLanguges();
  }, []);

  return (
    <MySelect
      values={languages}
      defaultValue={value.LanguageId}
      valuesPath={"LanguageId"}
      dataTextPath={"LanguageName"}
      handleChangeFunc={handleChange}
    />
  );
};

export default React.memo(LangSelect);
