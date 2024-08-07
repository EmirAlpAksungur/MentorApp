import React, { ReactNode, useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import { RootState } from "../../store/configureStore";
import { asyncLoadText } from "../../services/actions/translations";
import { TextListClass } from "../../utils/textContent";
import HeaderChart from "./HeaderChart";
import { Card } from "../../components";
import "../../assets/pages/profile/profile.scss";
import LeftBox from "./LeftBox";

const Main: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [text, setText] = useState<TextListClass | null>(null);
  const LanguageId = useAppSelector(
    (state: RootState) => state.languages.LanguageId
  );
  const helperAsync = async () => {
    const result = await asyncLoadText(LanguageId, [1627, 1628]);
    Array.isArray(result) && setText(new TextListClass(result));
  };

  useEffect(() => {
    helperAsync();
  }, [LanguageId]);
  return (
    <div className="profile-container">
      <div className="profile-container__box">
        <div className="profile-container__box__header">
          <div className="profile-container__box__header__chart">
            <HeaderChart />
          </div>
          <div className="profile-container__box__header__text">
            <div className="profile-container__box__header__text__header">
              {text?.getText(1627)}
            </div>
            <div className="profile-container__box__header__text__content">
              {text?.getText(1628)}
            </div>
          </div>
        </div>
        <div className="profile-container__box__body">
          <div className="profile-container__box__body__left">
            <Card>
              <LeftBox />
            </Card>
          </div>

          <div className="profile-container__box__body__right">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Main;
