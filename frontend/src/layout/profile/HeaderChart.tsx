import React from "react";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
const HeaderChart: React.FC = () => {
  return (
    <Gauge
      width={100}
      height={100}
      value={20}
      sx={(theme) => ({
        [`& .${gaugeClasses.valueArc}`]: {
          fill: "rgb(95, 235, 80)",
        },
        [`& .${gaugeClasses.referenceArc}`]: {
          fill: "white",
        },
      })}
    />
  );
};

export default HeaderChart;
