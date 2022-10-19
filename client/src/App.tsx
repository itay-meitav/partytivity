import "./App.scss";
import { BrowserRouter as Router, RouterProvider } from "react-router-dom";
import { router } from "./components/routes/AppRoutes";
import Template from "./components/template/Template";
function App() {
  return (
    <Template>
      <RouterProvider router={router} />
    </Template>
  );
}

export default App;
