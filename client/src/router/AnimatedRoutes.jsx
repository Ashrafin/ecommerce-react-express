import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { useAuth0 } from "@auth0/auth0-react";
import withSessionManagement from "@/hoc/withSessionManagement";
import HomePage from "@/pages/Home";
import ProfilePage from "@/pages/Profile";
import ProductPage from "@/pages/Product";
import AuthGuard from "@/components/shared/AuthGuard";
import Navbar from "@/components/layout/Navbar";
import PageTransitionAnimation from "@/animations/PageTransitionAnimation";
import FadeInOut from "@/animations/FadeInOut";

const AnimatedRoutes = () => {
  const location = useLocation();
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const ProfilePageWithAuth = withSessionManagement(ProfilePage);

  return (
    <>
      <AnimatePresence mode="wait">
        <FadeInOut
          key={location.pathname}
          identifier="navbar"
          duration={0.65}
          delay={0.45}
          customClasses="sticky-top"
          customStyles={{ transformOrigin: "top" }}
        >
          <Navbar
            isAuthenticated={isAuthenticated}
            loginWithRedirect={loginWithRedirect}
            logout={logout}
          />
        </FadeInOut>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransitionAnimation>
                <HomePage />
              </PageTransitionAnimation>
            }
          />
          <Route
            path="product/:id"
            element={
              <PageTransitionAnimation>
                <ProductPage />
              </PageTransitionAnimation>
            }
          />
          <Route
            path="/profile"
            element={
              <AuthGuard>
                <PageTransitionAnimation>
                  <ProfilePageWithAuth />
                </PageTransitionAnimation>
              </AuthGuard>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default AnimatedRoutes;