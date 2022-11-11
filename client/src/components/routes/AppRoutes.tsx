import { createBrowserRouter, Navigate, redirect } from "react-router-dom";
import Login from "../login/Login";
import LoginReset from "../loginResetPage/LoginReset";
import SignUp from "../signup/SignUp";
import SubmitSignup from "../signup/SubmitSignup";
import Unknown from "../unknown/Unknown";
import ConfirmEmail from "../confirm/ConfirmEmail";
import NewPassForm from "../loginResetPage/NewPassForm";
import PartyInvite from "../partyInvite/PartyInvite";
import config from "../../assets/config";
import { WelcomeRoutes } from "./WelcomeRoutes";
import { DashboardRoutes } from "./DashboardRoutes";
import DashboardTemplate from "../dashboard/DashboardTemplate";

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/welcome" /> },
  { path: "*", element: <Unknown /> },
  { path: "/welcome", children: [...WelcomeRoutes] },
  { path: "/login", children: [] },
  {
    path: "/login",
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
      { element: <SignUp />, index: true },
      { path: "success", element: <SubmitSignup /> },
    ],
  },
  {
    path: "/auth/confirm/:token",
    element: <ConfirmEmail />,
  },
  {
    path: "/dashboard",
    element: <DashboardTemplate />,
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
