import React, { Suspense, lazy } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { Loadable } from "../components";
import PrivateRouter from "./privateRouter";
import history from "./history";
const AuthLayout = Loadable(
  lazy(() => import("../layout/authentication/Main"))
);

const LogIn = Loadable(lazy(() => import("../pages/authorization/logIn/Main")));
const SignUp = Loadable(
  lazy(() => import("../pages/authorization/signUp/Main"))
);
const Community = Loadable(lazy(() => import("../pages/community/Main")));
const BlogHome = Loadable(lazy(() => import("../pages/blog/Home")));
const BlogExplore = Loadable(lazy(() => import("../pages/blog/Explore")));
const BlogProfile = Loadable(lazy(() => import("../pages/blog/Profile")));
const Profile = Loadable(lazy(() => import("../pages/profile/main")));

const BlogContainer = Loadable(lazy(() => import("../layout/blog/Container")));

const PageNotFound = Loadable(lazy(() => import("../pages/utils/NotFound")));
const PrivacyPolicy = Loadable(
  lazy(() => import("../pages/utils/PrivacyPolicy"))
);
const Terms = Loadable(lazy(() => import("../pages/utils/TermsAndConditions")));

const Chat = Loadable(lazy(() => import("../pages/chat/Main")));
const Download = Loadable(lazy(() => import("../pages/download/Main")));
const AppRouter: React.FC = () => {
  return (
    <HistoryRouter history={history}>
      <Suspense fallback={<Outlet />}>
        <Routes>
          <Route
            path="/auth"
            element={
              <AuthLayout>
                <Outlet />
              </AuthLayout>
            }
          >
            <Route
              path=""
              element={
                <LogIn>
                  <Outlet />
                </LogIn>
              }
            >
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="terms-conditions" element={<Terms />} />
            </Route>
            <Route
              path="login"
              element={
                <LogIn>
                  <Outlet />
                </LogIn>
              }
            >
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="terms-conditions" element={<Terms />} />
            </Route>
            <Route
              path="sign-up"
              element={
                <SignUp>
                  <Outlet />
                </SignUp>
              }
            >
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="terms-conditions" element={<Terms />} />
            </Route>
          </Route>
          <Route path="/" element={<PrivateRouter />}>
            <Route path="" element={<Community />} />
            <Route path="community" element={<Community />} />
            <Route path="chat" element={<Chat />} />
            <Route path="blog" element={<BlogContainer />}>
              <Route path="home/*" element={<BlogHome />} />
              <Route path="explore/*" element={<BlogExplore />} />
              <Route path="profile/*" element={<BlogProfile />} />
            </Route>
            <Route path="profile" element={<Profile />} />
            <Route path="download" element={<Download />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </HistoryRouter>
  );
};

export default React.memo(AppRouter);
