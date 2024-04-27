import React from "react";
import { MySelect } from "..";
import { useAppSelector } from "../../hooks/redux";
import { RootState } from "../../store/configureStore";
import SkillService from "../../services/api/skills";
import "../../assets/components/inputs/select.scss";
interface SkillSelectProps {
  value: number[];
  handleChangeFunc: (value: any) => void;
  [key: string]: any;
}

const MySkillSelect: React.FC<SkillSelectProps> = (props) => {
  const { value = [], handleChangeFunc = () => {}, ...rest } = props;
  const [values, setValues] = React.useState([]);
  const token = useAppSelector((state: RootState) => state.auth.token);

  const LanguageId = useAppSelector(
    (state: RootState) => state.languages.LanguageId
  );
  const handleChange = (value: number[] | string[]) => {
    handleChangeFunc([value]);
  };

  const asyncFunc = async () => {
    try {
      let result = await SkillService.allSkills({ LanguageId }, token);
      setValues(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    asyncFunc();
  }, []);

  return (
    <MySelect
      valuesPath={"SkillId"}
      dataTextPath={"name"}
      values={values}
      value={value?.[0]}
      handleChangeFunc={handleChange}
    />
  );
};

export default MySkillSelect;
