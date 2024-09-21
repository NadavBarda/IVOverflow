import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate, useLocation } from "react-router-dom";

function RequireAuth({ children }: { children: JSX.Element }) {
  const user = useSelector((state: RootState) => state.user);
  const location = useLocation();
  

  if (!user || !user.token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
