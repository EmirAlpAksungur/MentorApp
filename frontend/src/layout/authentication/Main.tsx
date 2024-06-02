import React, { ReactNode } from "react";
import "../../assets/pages/authentication/authentication.scss";
import "../../assets/components/box/authentication.scss";
import Header from "./Head";
import Footer from "./Footer";
import leftLogo from "../../assets/Img/left-background.png";
import rightLogo from "../../assets/Img/right-background.png";

interface MainProps {
  children: ReactNode;
}
const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <div className="authentication-container">
      <div className="authentication-container__left-img">
        <img src={leftLogo} />
      </div>
      <div className="authentication-container__right-img">
        <img src={rightLogo} />
      </div>
      <Header />
      <div className="authentication-container__body">{children}</div>
      <Footer />
    </div>
  );
};

export default Main;
