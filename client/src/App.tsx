import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./components/routes/AppRoutes";
import Template from "./components/template/Template";
import { RecoilRoot as GlobalState } from "recoil";
function App() {
  return (
    <Router>
      <GlobalState>
        <Template>
          <AppRoutes />
        </Template>
      </GlobalState>
    </Router>
  );
}

export default App;
