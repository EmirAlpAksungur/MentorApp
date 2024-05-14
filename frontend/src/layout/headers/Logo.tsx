import React from "react";
import applogo from "../../assets/Img/Icon.png";
import { routeToUrl } from "../../routers/utils";
const Logo: React.FC = () => {
  return (
    <img
      src={applogo}
      onClick={() => routeToUrl("/")}
      style={{
        cursor: "pointer",
        height: "40px",
        marginRight: "12px",
      }}
    ></img>
  );
};

export default React.memo(Logo);
