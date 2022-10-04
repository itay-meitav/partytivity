import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./components/routes/AppRoutes";
import Template from "./components/template/Template";
function App() {
  return (
    <Router>
      <Template>
        <AppRoutes />
      </Template>
    </Router>
  );
}

export default App;
