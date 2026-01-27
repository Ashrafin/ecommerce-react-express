import { useState } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate
} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { easings } from "@/animations/easings";
import { AnimatePresence } from "motion/react";
import withSessionManagement from "@/hoc/withSessionManagement";
import HomePage from "@/pages/Home";
import ProfilePage from "@/pages/Profile";
import ProductPage from "@/pages/Product";
import SearchPage from "@/pages/Search";
import CartPage from "@/pages/Cart";
import CheckoutPage from "@/pages/Checkout";
import SigningOutPage from "@/pages/SigningOut";
import SigningInPage from "@/pages/SigningIn";
import AuthGuard from "@/components/shared/AuthGuard";
import Navbar from "@/components/layout/Navbar";
import SearchBar from "@/components/layout/SearchBar";
import CartNotification from "@/components/shared/CartNotification";
import PageTransitionAnimation from "@/animations/PageTransitionAnimation";
import { FadeInOut } from "@/animations/FadeInOut";

const ProfilePageWithAuth = withSessionManagement(ProfilePage);

const AnimatedRoutes = ({ handleOpenCart }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth0();
  const [isSearchOpened, setIsSearchOpened] = useState(false);

  const handleOpenSearch = () => {
    setIsSearchOpened(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseSearch = () => {
    setIsSearchOpened(false);
    document.body.style.overflow = "unset";
  };

  const handleLogin = () => {
    navigate("/signing-in", { state: { returnTo: location.pathname } });
  };

  const handleLogout = () => {
    navigate("/signing-out");
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <FadeInOut
          key={location.pathname}
          identifier="navbar"
          duration={1}
          ease={easings.easeInOutQuad}
          customClasses="sticky-top"
        >
          <Navbar
            user={user}
            isAuthenticated={isAuthenticated}
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            handleOpenSearch={handleOpenSearch}
            handleOpenCart={handleOpenCart}
          />
        </FadeInOut>
      </AnimatePresence>

      <CartNotification />

      <AnimatePresence mode="wait">
        <Routes
          location={location}
          key={location.pathname}
        >
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
          <Route
            path="/search"
            element={
              <PageTransitionAnimation>
                <SearchPage />
              </PageTransitionAnimation>
            }
          />
          <Route
            path="/cart"
            element={
              <PageTransitionAnimation>
                <CartPage />
              </PageTransitionAnimation>
            }
          />
          <Route
            path="/checkout"
            element={
              <PageTransitionAnimation>
                <CheckoutPage />
              </PageTransitionAnimation>
            }
          />
          <Route
            path="/signing-out"
            element={
              <PageTransitionAnimation>
                <SigningOutPage />
              </PageTransitionAnimation>
            }
          />
          <Route
            path="/signing-in"
            element={
              <PageTransitionAnimation>
                <SigningInPage />
              </PageTransitionAnimation>
            }
          />
        </Routes>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {isSearchOpened && (
          <SearchBar
            isSearchOpened={isSearchOpened}
            handleCloseSearch={handleCloseSearch}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default AnimatedRoutes;