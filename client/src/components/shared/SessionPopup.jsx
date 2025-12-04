import {
  useEffect,
  useRef,
  useState
} from "react";
import "@/styles/SessionPopup.styles.css";

const SessionPopup = ({
  showPopup,
  extendSession,
  timeRemaining
}) => {
  const [visible, setVisible] = useState(false);
  const progressRef = useRef(null);

  useEffect(() => {
    if (showPopup && progressRef.current) {
      const duration = 10000; // 10 seconds

      setVisible(true);
      progressRef.current.style.width = "0%";

      const alertTimer = setTimeout(() => {
        setVisible(false);
      }, duration);

      return () => clearTimeout(alertTimer);
    }
  }, [showPopup]);

  return (
    <>
      {visible && (
        <div
          className={`alert alert-warning alert-dismissible shadow fade session-popup mb-0 ${visible ? "show" : ""}`}
          role="alert"
        >
          <div className="progress position-absolute top-0 start-0 w-100 h-2">
            <div
              ref={progressRef}
              className="progress-bar session-progress-bar bg-warning"
              role="progressbar"
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          />
          <p className="fs-6 fw-bold mb-1">
            Session expiring soon!
          </p>
          <p className="fs-6 mb-4">
            Your session will expire in about <time>{timeRemaining}</time> seconds.
          </p>
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