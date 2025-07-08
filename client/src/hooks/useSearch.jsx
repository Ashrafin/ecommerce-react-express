import useFetch from "./useFetch";

const useSearch = (query, limit = 10, skip = 0) => {
  const url = `https://dummyjson.com/products/search?q=${query}&limit=${limit}&skip=${skip}`;
  const { data, isLoading, hasError, error } = useFetch(url);

  return {
    products: data?.products ?? [],
    isLoading,
    hasError,
    error
  };
};

export default useSearch;