import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { RootState } from "../../store/configureStore";
import { asyncLoadText } from "../../services/actions/translations";
import { TranslatedTextType } from "../../services/types/translations";

import "../../assets/pages/errors/pageNotFound.scss";

const Main: React.FC = () => {
  const [text, setText] = useState<TranslatedTextType[]>([]);
  const LanguageId = useAppSelector(
    (state: RootState) => state.languages.LanguageId
  );

  const helperAsync = async () => {
    const result = await asyncLoadText(LanguageId, [5]);
    Array.isArray(result) && setText(result);
  };
  useEffect(() => {
    helperAsync();
  }, [LanguageId]);

  return (
    <div className="page-not-found-container">
      <div className="page-not-found-container__body">404 Page Not Found</div>
    </div>
  );
};

export default Main;
