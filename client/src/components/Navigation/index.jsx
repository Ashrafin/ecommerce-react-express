import { Link } from "react-router-dom";

const Navigation = ({ isAuthenticated, loginWithRedirect, logout }) => {
  const navigationItems = () => {
    if (isAuthenticated) {
      return (
        <>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <button type="button" onClick={() => logout({ returnTo: window.location.origin })}>
              Log out
            </button>
          </li>
        </>
      );
    }

    return (
      <li>
        <button type="button" onClick={() => loginWithRedirect()}>
          Log in
        </button>
      </li>
    );
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {navigationItems()}
      </ul>
    </nav>
  );
};

export default Navigation;