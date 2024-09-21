import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import QuestionPage from "../pages/questionPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { PrivateOutlet } from "./privateRouets";

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<PrivateOutlet />}>
          <Route path="/question" element={<QuestionPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/question" replace />} />
      </Routes>
    </Router>
  );
};
