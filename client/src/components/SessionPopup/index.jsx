const SessionPopup = ({ showPopup, extendSession, timeRemaining }) => {
  return (
    <>
      {showPopup && (
        <div style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          background: "white",
          padding: "1rem",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
          borderRadius: "8px",
          zIndex: 1000
        }}>
          <p>Your session will expire in about {timeRemaining} seconds</p>
          <button type="button" onClick={extendSession}>Extend Session</button>
        </div>
      )}
    </>
  );
};

export default SessionPopup;