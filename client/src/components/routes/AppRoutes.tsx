import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "../login/Login";
import LoginReset from "../loginResetPage/LoginReset";
import SignUp from "../signup/SignUp";
import WelcomeRoutes from "./WelcomeRoutes";
import About from "../about/About";
import Dashboard from "../dashboard/Dashboard";
import { useEffect } from "react";
import Submit from "../signup/Submit";
import Unknown from "../unknown/Unknown";
import ConfirmEmail from "../confirm/ConfirmEmail";
import NewPassForm from "../loginResetPage/NewPassForm";

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
          <Route path="new" element={<NewPassForm />} />
        </Route>
      </Route>
      <Route path="/register">
        <Route index element={<SignUp />} />
        <Route path="success" element={<Submit />} />
        <Route path="verified" element={<ConfirmEmail />} />
      </Route>
      <Route path="about" element={<About />} />
    </Routes>
  );
};

export default AppRoutes;
