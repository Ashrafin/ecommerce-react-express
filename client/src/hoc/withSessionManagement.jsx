import { useAuth0 } from "@auth0/auth0-react";
import useAutoLogout from "../hooks/useAutoLogout";
import useSessionTimer from "../hooks/useSessionTimer";
import useBackendAuth from "../hooks/useBackendAuth";
import SessionPopup from "@/components/shared/SessionPopup";

const withSessionManagement = (Component) => {
  return function WrappedComponent(props) {
    const { isAuthenticated, isLoading } = useAuth0();

    useAutoLogout();
    useBackendAuth();
    const { showPopup, extendSession, timeRemaining } = useSessionTimer({
      showExtendPromptAt: 60,
      checkInterval: 5000
    });

    if (isLoading) return <div>Loading...</div>;

    return (
      <>
        <Component {...props} />
        {isAuthenticated && (
          <SessionPopup
            showPopup={showPopup}
            extendSession={extendSession}
            timeRemaining={timeRemaining}
          />
        )}
      </>
    );
  };
};

export default withSessionManagement;