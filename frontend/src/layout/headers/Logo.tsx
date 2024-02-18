import React from "react";
import applogo from "../../assets/Img/applogo.png";
import { routeToUrl } from "../../routers/utils";
const Logo: React.FC = () => {
  return (
    <img
      src={applogo}
      onClick={() => routeToUrl("/")}
      style={{
        cursor: "pointer",
      }}
    ></img>
  );
};

export default React.memo(Logo);
