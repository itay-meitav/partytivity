import { RouteObject } from "react-router-dom";
import About from "../welcome/about-welcome/About";
import ProvidersWelcome from "../welcome/providers-welcome/ProvidersWelcome";
import Welcome from "../welcome/Welcome";

export const WelcomeRoutes: RouteObject[] = [
  { element: <Welcome />, index: true },
  { path: "providers", element: <ProvidersWelcome /> },
  {
    path: "about",
    element: <About />,
  },
];
