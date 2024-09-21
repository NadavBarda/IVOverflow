import { Navigate, Outlet } from "react-router-dom";

export const PrivateOutlet = () => {
  const userToken = localStorage.getItem("token");
  return userToken ? <Outlet /> : <Navigate to="/login" />;
};
