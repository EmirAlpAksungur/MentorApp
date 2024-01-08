import React from "react";
import applogo from "../../assets/Img/applogo.png";

const Logo: React.FC = () => {
  return <img src={applogo}></img>;
};

export default React.memo(Logo);
