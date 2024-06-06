import React from "react";
import { useAppSelector, useAppDispatch } from "./hooks/redux";
import AppRouter from "./routers/appRouter";
import { Notification } from "./components";
import NetworkCheck from "./components/errors/NetworkCheck";
import { applyTheme } from "./services/actions/theme";
function App() {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(applyTheme());
  }, []);
  return (
    <React.Fragment>
      <NetworkCheck>
        <AppRouter />
        <Notification />
      </NetworkCheck>
    </React.Fragment>
  );
}

export default App;
