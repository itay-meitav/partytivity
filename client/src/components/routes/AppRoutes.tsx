import { createBrowserRouter, Navigate, redirect } from "react-router-dom";
import Login from "../login/Login";
import LoginReset from "../login-reset/LoginReset";
import Register from "../register/Register";
import SubmitRegister from "../register/SubmitRegister";
import Unknown from "../unknown/Unknown";
import ConfirmEmail from "../confirm/ConfirmEmail";
import NewPassForm from "../login-reset/NewPassForm";
import PartyInvite from "../party-invite/PartyInvite";
import config from "../../assets/config";
import { WelcomeRoutes } from "./WelcomeRoutes";
import { DashboardRoutes } from "./DashboardRoutes";
import DashboardTemplate from "../dashboard/DashboardTemplate";
import WelcomeTemplate from "../welcome/welcome-template/WelcomeTemplate";
import ErrorPage from "../error/ErrorPage";

export const router = createBrowserRouter([
  { path: "*", element: <Unknown /> },
  {
    path: "/",
    element: <Navigate to="/welcome" />,
  },
  { path: "/error", element: <ErrorPage /> },
  {
    path: "/welcome",
    element: <WelcomeTemplate />,
    children: WelcomeRoutes,
  },
  {
    path: "/login",
    errorElement: <ErrorPage />,
    children: [
      { element: <Login />, index: true },
      {
        path: "reset",
        children: [
          { element: <LoginReset />, index: true },
          { path: "new/:token", element: <NewPassForm /> },
        ],
      },
    ],
  },
  {
    path: "register",
    children: [
      { element: <Register />, index: true },
      { path: "success", element: <SubmitRegister /> },
    ],
  },
  {
    path: "/auth/confirm/:token",
    element: <ConfirmEmail />,
  },
  {
    path: "/dashboard",
    element: <DashboardTemplate />,
    errorElement: <ErrorPage />,
    loader: async () => {
      const req = await fetch(`${config.apiHost}/login`, {
        credentials: "include",
      });
      if (!req.ok) return redirect("/login");
    },
    children: DashboardRoutes,
  },
  {
    path: "/invite",
    errorElement: <ErrorPage />,
    children: [
      { element: <Unknown />, index: true },
      {
        path: ":token",
        loader: async ({ params }) => {
          const req = await fetch(`${config.apiHost}/api/invite`, {
            method: "post",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ partyToken: params.token }),
          });
          if (!req.ok) return redirect("/welcome");
        },
        element: <PartyInvite />,
      },
    ],
  },
]);
