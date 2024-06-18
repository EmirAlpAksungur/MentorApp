import React from "react";
import { MySelect, LoadingComponent } from "..";
import { useAppSelector } from "../../hooks/redux";
import { RootState } from "../../store/configureStore";
import SkillService from "../../services/api/skills";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import "../../assets/components/inputs/knownSkillsSelect.scss";
import Loader from "../loading/Loader";
interface SkillSelectProps {
  value: number[];
  handleChangeFunc: (value: number[]) => void;
  [key: string]: any;
}
const Skills: React.FC<SkillSelectProps> = (props) => {
  const token = useAppSelector((state: RootState) => state.auth.token);
  const LanguageId = useAppSelector(
    (state: RootState) => state.languages.LanguageId
  );
  const [values, setValues] = React.useState<
    { SkillId: number; SkillTypeId: number; name: string }[]
  >([]);
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
  if (values.length > 0)
    return (
      <div className="known-skills-input__values">
        {props.value.map((val: number) => {
          let text = values.find((a) => a.SkillId === val)?.name;
          return (
            text && (
              <div className="known-skills-input__values__item" key={val}>
                {text}
                <IconButton
                  className="known-skills-input__values__item__btn"
                  onClick={() => {
                    props.handleChangeFunc(
                      props.value.filter((item: number) => item !== val)
                    );
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </div>
            )
          );
        })}
      </div>
    );
  return <Loader />;
};

const MySkillSelect: React.FC<SkillSelectProps> = (props) => {
  const { value = [], handleChangeFunc, ...rest } = props;

  const token = useAppSelector((state: RootState) => state.auth.token);
  const [skillType, setSkillType] = React.useState<number | undefined>(
    undefined
  );
  const [skillTypes, setSkillTypes] = React.useState([]);
  const [skill, setSkill] = React.useState<number | undefined>(undefined);
  const [skills, setSkills] = React.useState([]);
  const LanguageId = useAppSelector(
    (state: RootState) => state.languages.LanguageId
  );
  const handleChangeType = async (SkillTypeId: number) => {
    setSkillType(SkillTypeId);
    try {
      let res = await SkillService.getSkills(
        { SkillTypeId, LanguageId },
        token
      );
      console.log(res);
      setSkills(res.data);
    } catch {}
  };
  const handleChange = (value: number) => {
    setSkill(value);
  };
  const asyncFunc = async () => {
    try {
      setSkillTypes([]);
      let result = await SkillService.allTypes({ LanguageId }, token);
      setSkillTypes(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    asyncFunc();
  }, []);
  return (
    <div className="known-skills-input">
      <Skills value={value} handleChangeFunc={handleChangeFunc} />
      <div className="known-skills-input__select">
        <div className="known-skills-input__select__item">
          <MySelect
            valuesPath={"SkillTypeId"}
            dataTextPath={"name"}
            values={skillTypes}
            defaultValue={skillType ? skillType : undefined}
            handleChangeFunc={handleChangeType}
          />
        </div>
        <div className="known-skills-input__select__item">
          <MySelect
            valuesPath={"SkillId"}
            dataTextPath={"name"}
            values={skills}
            defaultValue={skill}
            handleChangeFunc={handleChange}
          />
        </div>
        <IconButton
          className="known-skills-input__select__btn"
          onClick={() => {
            skill && handleChangeFunc([...value, skill]);
          }}
        >
          <AddIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default MySkillSelect;
