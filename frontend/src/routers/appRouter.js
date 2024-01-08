import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { unstable_HistoryRouter as HistoryRouter, Outlet } from "react-router-dom";
import Start from '../layout/Main';
import history from "./history";

import { Loadable } from "../components";


const Home = Loadable(lazy(() => import("../pages/Main")));
const AppRouter = () => {
  return (
    <HistoryRouter history={history}>
      <Suspense fallback={<Outlet />}>
        <Routes>
          <Route exact path="/" element={<Start ><Outlet /></Start>}>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/starter" element={<Home />} />
          </Route>
        </Routes>
      </Suspense>
    </HistoryRouter>
  );
};

export default React.memo(AppRouter);
