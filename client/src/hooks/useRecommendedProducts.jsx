import useFetch from "./useFetch";

const useRecommendedProducts = (category, excludedId) => {
  const { data, isLoading, hasError, error } = useFetch(`https://dummyjson.com/products/category/${category}`);
  const similarProducts = data?.products
    ?.filter((product) => product.id !== excludedId)
    ?.slice(0, 4) || [];

  return {
    similarProducts,
    isLoading,
    hasError,
    error
  };
};

export default useRecommendedProducts;