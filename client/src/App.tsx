import "./App.css";
import { AppRoutes } from "./appRoutes/AppRoutes";

import AuthProvider from "react-auth-kit";
import { authStore } from "./appRoutes/authStore";

function App() {
  return (
    <AuthProvider store={authStore}>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
