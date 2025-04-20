import { useAuth0 } from "@auth0/auth0-react";
import { Routes, Route } from "react-router-dom";

import Navigation from "./components/Navigation";
import AuthGuard from "./components/AuthGuard";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

import "./App.css";
import withSessionManagement from "./hoc/withSessionManagement";

function App() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const ProfileWithAuth = withSessionManagement(Profile);

  return (
    <div>
      <Navigation
        isAuthenticated={isAuthenticated}
        loginWithRedirect={loginWithRedirect}
        logout={logout}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/profile"
          element={
            <AuthGuard>
              <ProfileWithAuth />
            </AuthGuard>
          }
        />
      </Routes>
    </div>
  );
}

export default App;