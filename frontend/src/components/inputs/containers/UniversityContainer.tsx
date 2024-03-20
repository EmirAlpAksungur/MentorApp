import { useCallback, useState } from "react";
import { Grid } from "@mui/material";
import UniversitySelect from "../UniversitySelect";
interface UniversitySelectContType {
  handleChangeFunc?: (value: number[]) => void;
  value?: number[];
  [key: string]: any;
}

interface ElementType {
  key: number;
  value: number;
}
export default function UniversityContainer(props: UniversitySelectContType) {
  const { handleChangeFunc = () => {}, value = [], ...rest } = props;
  const [element, setElement] = useState<ElementType[]>([
    { key: 0, value: -1 },
  ]);

  const handleChange = useCallback((key: number, val: number) => {
    setElement((prev: ElementType[]) => {
      const updatedArray = prev.map((item) => {
        if (item.key === key) {
          return { ...item, value: val };
        }
        return item;
      });

      const value = updatedArray.filter((e) => e.value !== -1);
      handleChangeFunc(value.map((e) => e.value));
      if (updatedArray[updatedArray.length - 1].value !== -1)
        return [
          ...updatedArray,
          { key: updatedArray[updatedArray.length - 1].key + 1, value: -1 },
        ];
      return [...updatedArray];
    });
  }, []);
  const removeElement = useCallback((key: number) => {
    setElement((prev) => {
      const updatedArray = prev.filter((e) => e.key !== key);
      const value = updatedArray.filter((e) => e.value !== -1);
      handleChangeFunc(value.map((e) => e.value));
      return updatedArray;
    });
  }, []);
  return (
    <Grid container rowSpacing={2}>
      {element.map((e) => {
        return (
          <Grid key={e.key} item xs={12}>
            <UniversitySelect
              index={e.key}
              value={e.value}
              handleChangeFunc={handleChange}
              removeElement={removeElement}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
