import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import $ from "jquery";
import { useAppSelector } from "../../hooks/redux";
import { RootState } from "../../store/configureStore";
import { asyncLoadText } from "../../services/actions/translations";
import { TextListClass } from "../../utils/textContent";
import { routeToUrl } from "../../routers/utils";

const Footer: React.FC = () => {
  const location = useLocation();
  const LanguageId = useAppSelector(
    (state: RootState) => state.languages.LanguageId
  );

  const [text, setText] = useState<TextListClass | null>(null);
  const nestedTextElement: string | undefined = text?.getNestedText(1516);

  const helperAsync = async () => {
    const result = await asyncLoadText(LanguageId, [1516, 1517, 1518]);
    Array.isArray(result) && setText(new TextListClass(result));
  };

  const handlePrivacyClick = () => {
    routeToUrl(location.pathname + "/privacy-policy");
    console.log("handlePrivacyClick");
  };
  const handleTermsClick = () => {
    console.log("handleTermsClick");
  };

  const addOnClick = () => {
    $(`.regex-1517`).on("click", () => {
      handlePrivacyClick();
    });
  };
  const cleanOnClick = () => {
    $(`.regex-1517`).off("click");
  };
  useEffect(() => {
    helperAsync();
  }, [LanguageId]);
  useEffect(() => {
    addOnClick();
    return () => {
      cleanOnClick();
    };
  }, [nestedTextElement, location]);

  if (nestedTextElement) {
    return (
      <div className="authentication-container__footer">
        <span
          className="authentication-container__footer__left"
          dangerouslySetInnerHTML={{ __html: nestedTextElement }}
        />
        <span className="authentication-container__footer__right">
          <div
            className="authentication-container__footer__right__item"
            onClick={handlePrivacyClick}
          >
            {text?.getText(1517)}
          </div>
          <div
            className="authentication-container__footer__right__item"
            onClick={handleTermsClick}
          >
            {text?.getText(1518)}
          </div>
        </span>
      </div>
    );
  }
  return <></>;
};

export default Footer;
