import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import QuestionsPage from "../pages/question/QuestionsPage";
import LoginPage from "../pages/login/LoginPage";
import RegisterPage from "../pages/register/RegisterPage";
import NavBar from "../components/navBar/NavBar";
import QuestionPage from "../pages/question/QuestionPage";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";

export const AppRoutes = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<AuthOutlet fallbackPath='/login' />}>
          <Route path="/questions" element={<QuestionsPage />} />
          <Route path="/questions/:id" element={<QuestionPage />} />
          <Route path="*" element={<Navigate to="/questions" replace />} />
        </Route>
      </Routes>
    </Router>
  );
};
