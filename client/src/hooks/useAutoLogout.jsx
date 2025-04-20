import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

const useAutoLogout = (intervalMs = 7200000) => {
  const { isAuthenticated, getAccessTokenSilently, logout } = useAuth0();
  const [hasLoggedOut, setHasLoggedOut] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;

    const checkToken = async () => {
      try {
        await getAccessTokenSilently();
      } catch (err) {
        if (err.error === "login_required" && !hasLoggedOut) {
          setHasLoggedOut(true);
          console.log("Session expired (autoLogout), logging out...");
          logout({ returnTo: window.location.origin });
        }
      }
    };

    const interval = setInterval(checkToken, intervalMs);

    return () => clearInterval(interval);
  }, [isAuthenticated, getAccessTokenSilently, logout, hasLoggedOut]);

  return null;
};

export default useAutoLogout;