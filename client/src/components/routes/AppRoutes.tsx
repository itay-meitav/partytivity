import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "../login/Login";
import LoginReset from "../loginResetPage/LoginReset";
import SignUp from "../signup/SignUp";
import WelcomeRoutes from "./WelcomeRoutes";
import { useEffect } from "react";
import SubmitSignup from "../signup/SubmitSignup";
import Unknown from "../unknown/Unknown";
import ConfirmEmail from "../confirm/ConfirmEmail";
import NewPassForm from "../loginResetPage/NewPassForm";
import DashboardRoutes from "./DashboardRoutes";

const AppRoutes = () => {
  let NavigateWelcome = () => {
    let navigate = useNavigate();
    useEffect(() => {
      navigate("/welcome");
    }, []);
    return <></>;
  };
  return (
    <Routes>
      <Route path="/" element={<NavigateWelcome />} />
      <Route path="*" element={<Unknown />} />
      <Route path="/welcome">{WelcomeRoutes()}</Route>
      <Route path="/login">
        <Route index element={<Login />} />
        <Route path="reset">
          <Route index element={<LoginReset />} />
          <Route path="new">
            <Route path=":token" element={<NewPassForm />} />
          </Route>
        </Route>
      </Route>
      <Route path="/register">
        <Route index element={<SignUp />} />
        <Route path="success" element={<SubmitSignup />} />
      </Route>
      <Route path="/auth">
        <Route path="confirm">
          <Route path=":token" element={<ConfirmEmail />} />
        </Route>
      </Route>
      <Route path="/dashboard">{DashboardRoutes()}</Route>
    </Routes>
  );
};

export default AppRoutes;
// auth/reset
