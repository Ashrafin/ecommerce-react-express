import useFetch from "./useFetch";

const useProducts = ({ limit = 10, skip = 0, category, minPrice, maxPrice, sort }) => {
  const params = new URLSearchParams();

  params.set("limit", limit);
  params.set("skip", skip);

  if (category) params.set("category", category);
  if (minPrice) params.set("minPrice", minPrice);
  if (maxPrice) params.set("maxPrice", maxPrice);
  if (sort) params.set("sort", sort);

  const url = `https://dummyjson.com/products?${params.toString()}`;
  const { data, isLoading, hasError, error } = useFetch(url);

  return {
    products: data?.products ?? [],
    total: data?.total,
    isLoading,
    hasError,
    error
  };
};

export default useProducts;