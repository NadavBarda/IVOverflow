import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import QuestionPage from "../pages/question/questionPage";
import LoginPage from "../pages/login/LoginPage";
import RegisterPage from "../pages/register/RegisterPage";
import { PrivateOutlet } from "./PrivateRouets";
import NavBar from "../components/navBar/NavBar";

export const AppRoutes = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<PrivateOutlet />}>
          <Route path="/questions" element={<QuestionPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/questions" replace />} />
      </Routes>
    </Router>
  );
};
