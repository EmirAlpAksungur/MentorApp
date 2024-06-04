import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../../hooks/redux";
import { RootState } from "../../../store/configureStore";
import { asyncLoadText } from "../../../services/actions/translations";
import { TextListClass } from "../../../utils/textContent";
import "../../../assets/pages/utils/policy.scss";
const Main = () => {
  const LanguageId = useAppSelector(
    (state: RootState) => state.languages.LanguageId
  );

  const [text, setText] = useState<TextListClass | null>(null);
  const helperAsync = async () => {
    const result = await asyncLoadText(
      LanguageId,
      [
        1517, 1526, 1527, 1528, 1529, 1530, 1531, 1532, 1533, 1534, 1535, 1536,
        1537, 1538, 1539, 1540, 1541, 1542, 1543, 1544, 1545, 1546, 1547, 1548,
        1549, 1550, 1551, 1552, 1553, 1554, 1555,
      ]
    );
    Array.isArray(result) && setText(new TextListClass(result));
  };

  useEffect(() => {
    helperAsync();
  }, [LanguageId]);
  return (
    <div className="policy">
      <div className="policy__header"> {text?.getText(1517)}</div>

      <div className="policy__body">
        <div className="policy__body__content">{text?.getText(1526)}</div>
        <div className="policy__body__header">{text?.getText(1527)}</div>
        <div className="policy__body__content">{text?.getText(1528)}</div>
        <ul className="policy__body__list">
          <li>{text?.getText(1529)}</li>
          <li>{text?.getText(1530)}</li>
          <li>{text?.getText(1531)}</li>
          <li>{text?.getText(1532)}</li>
          <li>{text?.getText(1533)}</li>
          <li>{text?.getText(1534)}</li>
        </ul>
        <div className="policy__body__header">{text?.getText(1535)}</div>
        <div className="policy__body__content">{text?.getText(1536)}</div>
        <ul className="policy__body__list">
          <li>{text?.getText(1537)}</li>
          <li>{text?.getText(1538)}</li>
          <li>{text?.getText(1539)}</li>
          <li>{text?.getText(1540)}</li>
          <li>{text?.getText(1541)}</li>
          <li>{text?.getText(1542)}</li>
        </ul>
        <div className="policy__body__header">{text?.getText(1543)}</div>
        <div className="policy__body__content">{text?.getText(1544)}</div>
        <div className="policy__body__header">{text?.getText(1545)}</div>
        <div className="policy__body__content">{text?.getText(1546)}</div>
        <ul className="policy__body__list">
          <li>{text?.getText(1547)}</li>
          <li>{text?.getText(1548)}</li>
          <li>{text?.getText(1549)}</li>
        </ul>
        <div className="policy__body__header">{text?.getText(1550)}</div>
        <div className="policy__body__content">{text?.getText(1551)}</div>
        <div className="policy__body__header">{text?.getText(1552)}</div>
        <div className="policy__body__content">{text?.getText(1553)}</div>
        <div className="policy__body__header">{text?.getText(1554)}</div>
        <div className="policy__body__content">{text?.getText(1555)}</div>
      </div>
    </div>
  );
};

export default Main;
