import React from "react";
import AppRouter from "./routers/appRouter";
import { Notification } from "./components";
function App() {
  return (
    <React.Fragment>
      <AppRouter />
      <Notification />
    </React.Fragment>
  );
}

export default App;
