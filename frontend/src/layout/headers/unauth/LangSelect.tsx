import React, { useState } from "react";
import { MySelect } from "../../../components";

const ThemeSelect: React.FC = () => {
  const [value, setValue] = useState<string>("English");
  const handleChange = (val: string) => {
    setValue(val);
  };
  return (
    <div className="app-header__left__lang-select">
      <MySelect
        values={["Turkish", "English"]}
        defaultValue={value}
        handleChangeFunc={handleChange}
      />
    </div>
  );
};

export default React.memo(ThemeSelect);
