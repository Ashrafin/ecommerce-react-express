const RenderWithFallback = ({ isLoading, hasError, fallback, children }) => {
  if (hasError) return null;
  if (isLoading) return fallback;

  return children;
};

export default RenderWithFallback;