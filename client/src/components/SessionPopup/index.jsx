import { useEffect, useState } from "react";

const SessionPopup = ({ showPopup, extendSession, timeRemaining }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (showPopup) {
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  return (
    <>
      {visible && (
        <div
          className={`alert alert-warning alert-dismissible fade session-popup ${visible ? "show" : ""}`}
          role="alert"
        >
          <strong>Session expiring soon!</strong>
          <p>Your session will expire in about <time>{timeRemaining}</time> seconds.</p>
          <button
            type="button"
            className="btn btn-sm btn-outline-warning"
            onClick={extendSession}
          >
            Extend Session
          </button>
        </div>
      )}
    </>
  );
};

export default SessionPopup;