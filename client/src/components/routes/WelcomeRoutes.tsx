import React from "react";
import { Route } from "react-router-dom";
import ProvidersWelcome from "../welcome/providersWelcome/ProvidersWelcome";
import Welcome from "../welcome/Welcome";

const WelcomeRoutes = () => {
  return (
    <>
      <Route index element={<Welcome />} />
      <Route path="providers" element={<ProvidersWelcome />} />
    </>
  );
};

export default WelcomeRoutes;
