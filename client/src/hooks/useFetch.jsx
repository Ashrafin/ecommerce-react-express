import { useEffect, useState } from "react";

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setIsLoading(true);
      setHasError(false);
      setError(null);

      try {
        const response = await fetch(url, { ...options, signal });
        if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Fetch error: ", err);
          setHasError(true);
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url]);

  return { data, isLoading, hasError, error };
};

export default useFetch;