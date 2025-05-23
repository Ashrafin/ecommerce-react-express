import { Link, useLocation } from "react-router-dom";
import CartItemCount from "@/components/ui/CartItemCount";

const Navbar = ({ isAuthenticated, loginWithRedirect, logout }) => {
  const location = useLocation();
  const currentTheme = document.body.getAttribute("data-bs-theme");

  return (
    <nav className="navbar navbar-expand-md sticky-top bg-info-subtle" data-bs-theme={currentTheme}>
      <div className="container d-flex flex-row justify-content-between align-items-center px-3 px-md-4">
        <div className="d-flex flex-row">
          <ul className="navbar-nav">
            <li className="nav-item mx-2">
              <Link className="nav-link text-info-emphasis fs-6 fw-medium" aria-current="page" to="/">Home</Link>
            </li>
          </ul>
        </div>
        <div className="d-flex flex-row align-items-center">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <button className="nav-link text-info-emphasis dropdown-toggle fs-6 fw-medium" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Account
              </button>
              <ul className="dropdown-menu">
                {isAuthenticated && (
                  <>
                    <li>
                      <Link className={`dropdown-item ${location.pathname === "/profile" ? "active" : ""} fs-6`} to="/profile">Profile</Link>
                    </li>
                    <li>
                      <button className="dropdown-item fs-6" onClick={() => {logout({ returnTo: window.location.origin })}}>
                        Logout
                      </button>
                    </li>
                  </>
                )}
                {!isAuthenticated && (
                  <li>
                    <button className="dropdown-item fs-6" onClick={() => loginWithRedirect()}>
                      Login
                    </button>
                  </li>
                )}
              </ul>
            </li>
          </ul>
          <CartItemCount />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;