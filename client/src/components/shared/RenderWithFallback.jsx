import { useEffect, useState } from "react";

const RenderWithFallback = ({ isLoading, hasError, fallback, children, delay = 200 }) => {
  const [showFallback, setShowFallback] = useState(isLoading);

  useEffect(() => {
    let timeout;

    if (isLoading) {
      setShowFallback(true);
    } else {
      timeout = setTimeout(() => setShowFallback(false), delay);
    }

    return () => clearTimeout(timeout);
  }, [isLoading, delay]);

  if (hasError) return null;

  return (
    <>
      {showFallback ? fallback : children}
    </>
  );
};

export default RenderWithFallback;