import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

const useSessionTimer = ({ showExtendPromptAt = 60, checkInterval = 5000 } = {}) => {
  const { isAuthenticated, getAccessTokenSilently, logout } = useAuth0();
  const [showPopup, setShowPopup] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [hasLoggedOut, setHasLoggedOut] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;

    const checkSession = async () => {
      try {
        const { expires_in } = await getAccessTokenSilently({ detailedResponse: true });

        if (typeof expires_in !== "number" || isNaN(expires_in)) {
          console.warn("Invalid expires_in value:", expires_in);
          return;
        }

        setTimeRemaining(expires_in);

        if (expires_in <= showExtendPromptAt && !showPopup) {
          console.log("Session expiring soon");
          setShowPopup(true);
        }

        if (expires_in <= 0 && !hasLoggedOut) {
          setHasLoggedOut(true);
          console.warn("Token expired, logging out...");
          logout({ returnTo: window.location.origin });
        }
      } catch (err) {
        console.error("Error checking session:", err);
        if (!hasLoggedOut) {
          setHasLoggedOut(true);
          logout({ returnTo: window.location.origin });
        }
      }
    };

    const interval = setInterval(checkSession, checkInterval);

    return () => clearInterval(interval);
  }, [
    isAuthenticated,
    logout,
    showPopup,
    hasLoggedOut,
    getAccessTokenSilently
  ]);

  const extendSession = async () => {
    try {
      await getAccessTokenSilently();
      console.log("Session extended");
      setShowPopup(false);
      setHasLoggedOut(false);
    } catch (err) {
      console.error("Could not extend session", err);
      if (!hasLoggedOut) {
        setHasLoggedOut(true);
        logout({ returnTo: window.location.origin });
      }
    }
  };

  return { showPopup, extendSession, timeRemaining };
};

export default useSessionTimer;