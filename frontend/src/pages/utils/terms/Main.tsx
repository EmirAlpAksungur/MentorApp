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
        1518, 1556, 1557, 1558, 1559, 1560, 1561, 1562, 1563, 1564, 1565, 1566,
        1567, 1568, 1569, 1570, 1571, 1572, 1573, 1574, 1575, 1576, 1577, 1578,
        1579, 1580, 1581, 1582, 1583, 1584, 1585, 1586, 1587, 1588, 1589, 1590,
        1591, 1592, 1593, 1594, 1595, 1596, 1597, 1598, 1599, 1600, 1601, 1602,
        1603, 1604, 1605, 1606, 1607, 1608, 1609, 1610, 1611, 1612, 1613, 1614,
        1615, 1616, 1617, 1618, 1619, 1620, 1621, 1622, 1623, 1624, 1625, 1626,
      ]
    );
    Array.isArray(result) && setText(new TextListClass(result));
  };

  useEffect(() => {
    helperAsync();
  }, [LanguageId]);
  return (
    <div className="policy">
      <div className="policy__header"> {text?.getText(1518)}</div>
      <div className="policy__body">
        <div className="policy__body__content">{text?.getText(1556)}</div>
        <div className="policy__body__content">{text?.getText(1557)}</div>
        <div className="policy__body__content">{text?.getText(1558)}</div>
        <div className="policy__body__header">{text?.getText(1559)}</div>
        <div className="policy__body__content">{text?.getText(1560)}</div>
        <ul className="policy__body__list">
          <li>{text?.getText(1561)}</li>
          <li>{text?.getText(1562)}</li>
          <li>{text?.getText(1563)}</li>
          <li>{text?.getText(1564)}</li>
        </ul>
        <div className="policy__body__header">{text?.getText(1565)}</div>
        <div className="policy__body__content">{text?.getText(1566)}</div>
        <div className="policy__body__content">{text?.getText(1567)}</div>
        <div className="policy__body__header">{text?.getText(1568)}</div>
        <div className="policy__body__content">{text?.getText(1569)}</div>
        <div className="policy__body__content">{text?.getText(1570)}</div>
        <ul className="policy__body__list">
          <li>{text?.getText(1571)}</li>
          <li>{text?.getText(1572)}</li>
          <li>{text?.getText(1573)}</li>
          <li>{text?.getText(1574)}</li>
        </ul>
        <div className="policy__body__content">{text?.getText(1575)}</div>
        <div className="policy__body__header">{text?.getText(1576)}</div>
        <div className="policy__body__content">{text?.getText(1577)}</div>
        <div className="policy__body__content">{text?.getText(1578)}</div>
        <div className="policy__body__content">{text?.getText(1579)}</div>
        <div className="policy__body__content">{text?.getText(1580)}</div>
        <ul className="policy__body__list">
          <li>{text?.getText(1581)}</li>
          <li>{text?.getText(1582)}</li>
          <li>{text?.getText(1583)}</li>
          <li>{text?.getText(1584)}</li>
        </ul>
        <div className="policy__body__content">{text?.getText(1585)}</div>
        <div className="policy__body__header">{text?.getText(1586)}</div>
        <div className="policy__body__content">{text?.getText(1587)}</div>
        <ul className="policy__body__list">
          <li>{text?.getText(1588)}</li>
          <li>{text?.getText(1589)}</li>
          <li>{text?.getText(1590)}</li>
          <li>{text?.getText(1591)}</li>
          <li>{text?.getText(1592)}</li>
        </ul>
        <div className="policy__body__content">{text?.getText(1593)}</div>
        <div className="policy__body__content">{text?.getText(1594)}</div>
        <ul className="policy__body__list">
          <li>{text?.getText(1595)}</li>
          <li>{text?.getText(1596)}</li>
          <li>{text?.getText(1597)}</li>
          <li>{text?.getText(1598)}</li>
          <li>{text?.getText(1599)}</li>
          <li>{text?.getText(1600)}</li>
          <li>{text?.getText(1601)}</li>
        </ul>
        <div className="policy__body__content">{text?.getText(1602)}</div>
        <div className="policy__body__content">{text?.getText(1603)}</div>
        <div className="policy__body__content">{text?.getText(1604)}</div>
        <div className="policy__body__content">{text?.getText(1605)}</div>
        <ul className="policy__body__list">
          <li>{text?.getText(1606)}</li>
          <li>{text?.getText(1607)}</li>
          <li>{text?.getText(1608)}</li>
        </ul>
        <div className="policy__body__content">{text?.getText(1609)}</div>
        <div className="policy__body__header">{text?.getText(1610)}</div>
        <div className="policy__body__content">{text?.getText(1611)}</div>
        <div className="policy__body__header">{text?.getText(1612)}</div>
        <div className="policy__body__content">{text?.getText(1613)}</div>
        <div className="policy__body__header">{text?.getText(1614)}</div>
        <div className="policy__body__content">{text?.getText(1615)}</div>
        <div className="policy__body__header">{text?.getText(1616)}</div>
        <div className="policy__body__content">{text?.getText(1617)}</div>
        <div className="policy__body__content">{text?.getText(1618)}</div>
        <div className="policy__body__header">{text?.getText(1619)}</div>
        <div className="policy__body__content">{text?.getText(1620)}</div>
        <ul className="policy__body__list">
          <li>{text?.getText(1621)}</li>
          <li>{text?.getText(1622)}</li>
          <li>{text?.getText(1623)}</li>
          <li>{text?.getText(1624)}</li>
        </ul>
        <div className="policy__body__content">{text?.getText(1625)}</div>
        <div className="policy__body__content">{text?.getText(1626)}</div>
      </div>
    </div>
  );
};

export default Main;
