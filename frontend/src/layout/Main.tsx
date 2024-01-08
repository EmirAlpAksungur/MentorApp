import React, { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}
const Main: React.FC<MainProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default React.memo(Main);
