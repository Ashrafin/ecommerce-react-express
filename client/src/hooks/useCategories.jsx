import useFetch from "./useFetch";

const useCategories = () => {
  const url = "https://dummyjson.com/products/categories";
  const { data, isLoading, hasError, error } = useFetch(url);

  return {
    categories: data ?? [],
    categoriesIsLoading: isLoading,
    categoriesHasError: hasError,
    categoriesError: error
  };
};

export default useCategories;