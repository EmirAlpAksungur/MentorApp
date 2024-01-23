import React, { Suspense, lazy } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { Loadable } from "../components";
import PrivateRouter from "./privateRouter";
import Start from "../layout/Main";
import history from "./history";

const Home = Loadable(lazy(() => import("../pages/Main")));
const LogIn = Loadable(lazy(() => import("../pages/authorization/logIn/Main")));
const SignUp = Loadable(
  lazy(() => import("../pages/authorization/signUp/Main"))
);

const AppRouter: React.FC = () => {
  return (
    <HistoryRouter history={history}>
      <Suspense fallback={<Outlet />}>
        <Routes>
          <Route path="/" element={<PrivateRouter />}>
            <Route path="/" element={<Home />} />
            <Route path="/starter" element={<Home />} />
          </Route>
          <Route
            path="/"
            element={
              <Start>
                <Outlet />
              </Start>
            }
          >
            <Route index path="/home" element={<Home />} />
            <Route index path="/log-in" element={<LogIn />} />
            <Route index path="/sign-up" element={<SignUp />} />
          </Route>
        </Routes>
      </Suspense>
    </HistoryRouter>
  );
};

export default React.memo(AppRouter);
