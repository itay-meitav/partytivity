import About from "../welcome/about/About";
import ProvidersWelcome from "../welcome/providersWelcome/ProvidersWelcome";
import Welcome from "../welcome/Welcome";

export const WelcomeRoutes = [
  { element: <Welcome />, index: true },
  { path: "providers", element: <ProvidersWelcome /> },
  {
    path: "about",
    element: <About />,
  },
];
