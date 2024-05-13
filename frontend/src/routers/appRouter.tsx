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
const BlogHome = Loadable(lazy(() => import("../pages/blog/Home")));
const BlogExplore = Loadable(lazy(() => import("../pages/blog/Explore")));
const BlogProfile = Loadable(lazy(() => import("../pages/blog/Profile")));

const BlogContainer = Loadable(lazy(() => import("../layout/blog/Container")));

const PageNotFound = Loadable(lazy(() => import("../pages/errors/NotFound")));
const Chat = Loadable(lazy(() => import("../pages/chat/Main")));
const Download = Loadable(lazy(() => import("../pages/download/Main")));
const AppRouter: React.FC = () => {
  return (
    <HistoryRouter history={history}>
      <Suspense fallback={<Outlet />}>
        <Routes>
          <Route path="/" element={<PrivateRouter />}>
            <Route path="" element={<Community />} />
            <Route path="community" element={<Community />} />
            <Route path="chat" element={<Chat />} />
            <Route path="blog" element={<BlogContainer />}>
              <Route path="home/*" element={<BlogHome />} />
              <Route path="explore/*" element={<BlogExplore />} />
              <Route path="profile/*" element={<BlogProfile />} />
            </Route>

            <Route path="download" element={<Download />} />
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
            <Route path="download" element={<Download />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </HistoryRouter>
  );
};

export default React.memo(AppRouter);
