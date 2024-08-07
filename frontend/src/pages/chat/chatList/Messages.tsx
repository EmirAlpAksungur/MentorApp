import React, { useEffect, useState } from "react";

import { useAppSelector } from "../../../hooks/redux";
import { RootState } from "../../../store/configureStore";
import { asyncLoadText } from "../../../services/actions/translations";
import { TextListClass } from "../../../utils/textContent";
const Messages: React.FC = () => {
  const [text, setText] = useState<TextListClass | null>(null);
  const LanguageId = useAppSelector(
    (state: RootState) => state.languages.LanguageId
  );
  const helperAsync = async () => {
    const result = await asyncLoadText(LanguageId, [1674]);
    Array.isArray(result) && setText(new TextListClass(result));
  };
  useEffect(() => {
    helperAsync();
  }, [LanguageId]);
  return text?.getText(1674);
};

export default Messages;
