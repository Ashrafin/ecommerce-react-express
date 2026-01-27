import {
  Link,
  useLocation
} from "react-router-dom";
import { useCartStore } from "@/store/useCartStore";
import CartItemCount from "@/components/ui/CartItemCount";
import "@/styles/Navbar.styles.css";

const Navbar = ({
  user,
  isAuthenticated,
  handleLogin,
  handleLogout,
  handleOpenSearch,
  handleOpenCart
}) => {
  const location = useLocation();
  const totalItems = useCartStore(store => store.totalItems());
  const currentTheme = document.body.getAttribute("data-bs-theme");

  return (
    <nav
      className="navbar navbar-expand-md sticky-top bg-info-subtle"
      data-bs-theme={currentTheme}
    >
      <div className="container d-flex flex-row justify-content-between align-items-center py-1 px-3 px-md-4">
        <div className="d-flex flex-row">
          <ul className="navbar-nav">
            <li className="nav-item mx-2">
              <Link
                className="nav-link text-info-emphasis fs-7 fw-medium"
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
          </ul>
        </div>
        <div className="d-flex flex-row align-items-center">
          <ul className="navbar-nav me-3">
            <li className="nav-item dropdown">
              <button
                className="nav-link inter text-info-emphasis dropdown-toggle fs-7 fw-semibold rounded-pill px-3 no-arrow d-flex align-items-center gap-2"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ backgroundColor: "#ECFAFE" }}
              >
                {isAuthenticated && user ? (
                  <>
                    <img
                      src={user.picture}
                      alt={user.given_name}
                      referrerPolicy="no-referrer"
                      className="rounded-circle border border-2 border-secondary-subtle"
                      style={{ width: "22px", height: "22px" }}
                    />
                    <span>
                      {user.given_name}
                    </span>
                  </>
                ) : (
                  <span>
                    Account
                  </span>
                )}
                <i className="bi bi-caret-down-fill fs-8" />
              </button>
              <ul className="dropdown-menu border border-1 border-light-subtle shadow-sm">
                {isAuthenticated && (
                  <>
                    <li>
                      <Link
                        className={`dropdown-item ${location.pathname === "/profile" ? "active" : ""} inter fw-medium fs-7`}
                        to="/profile"
                      >
                        View Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        className="dropdown-item inter fw-medium fs-7"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}
                {!isAuthenticated && (
                  <li>
                    <button
                      className="dropdown-item inter fw-medium fs-7"
                      onClick={handleLogin}
                    >
                      Login
                    </button>
                  </li>
                )}
              </ul>
            </li>
          </ul>
          <button
            className="btn p-0 bg-transparent border-0"
            onClick={handleOpenSearch}
          >
            <i className="bi bi-search fs-5" />
          </button>
          <CartItemCount
            count={totalItems}
            handleOpenCart={handleOpenCart}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;