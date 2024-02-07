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
const Community = Loadable(lazy(() => import("../pages/community/Main")));
const PageNotFound = Loadable(lazy(() => import("../pages/errors/NotFound")));
const AppRouter: React.FC = () => {
  return (
    <HistoryRouter history={history}>
      <Suspense fallback={<Outlet />}>
        <Routes>
          <Route path="/" element={<PrivateRouter />}>
            <Route path="" element={<Community />} />
            <Route path="community" element={<Community />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
          <Route
            path="/"
            element={
              <Start>
                <Outlet />
              </Start>
            }
          >
            <Route path="home" element={<Home />} />
            <Route path="log-in" element={<LogIn />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </HistoryRouter>
  );
};

export default React.memo(AppRouter);
