import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const useBackendAuth = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated) return;

    const authenticateWithBackend = async () => {
      try {
        const token = await getAccessTokenSilently();
        const res = await fetch("http://localhost:5000/protected", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();
        console.log("Backend verified: ", data);
      } catch (err) {
        console.error("Backend auth failed: ", err?.message || err);
      }
    };

    authenticateWithBackend();
  }, [isAuthenticated]);
};

export default useBackendAuth;