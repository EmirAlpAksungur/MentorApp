import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/configureStore";

const Text: React.FC = React.memo(() => {
  const text = useSelector((state: RootState) => state.checkRedux.text);

  return (
    <div>
      <p>{text}</p>
    </div>
  );
});

const Main: React.FC = () => {
  return (
    <React.Fragment>
      asd
      <Text />
    </React.Fragment>
  );
};

export default React.memo(Main);
