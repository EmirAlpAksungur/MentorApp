import React from "react";
import AppRouter from "./routers/appRouter";
import { Notification } from "./components";
import NetworkCheck from "./components/errors/NetworkCheck";
function App() {
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
