import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Profile from "./pages/Profile";

import withSessionManagement from "./hoc/withSessionManagement";

import AuthGuard from "./components/shared/AuthGuard";
import Container from "./components/ui/Container";
import Navbar from "./components/layout/Navbar";
import CartCanvas from "./components/shared/CartCanvas";
import ProductPage from "./pages/Product";

const App = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const ProfileWithAuth = withSessionManagement(Profile);

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", "light");
  }, []);

  return (
    <Container
      fluid
      utilityClasses="w-100 vw-100 d-flex flex-column px-0"
    >
      <Navbar
        isAuthenticated={isAuthenticated}
        loginWithRedirect={loginWithRedirect}
        logout={logout}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="product/:id" element={<ProductPage />} />
        <Route
          path="/profile"
          element={
            <AuthGuard>
              <ProfileWithAuth />
            </AuthGuard>
          }
        />
      </Routes>
      <CartCanvas />
    </Container>
  );
};

export default App;