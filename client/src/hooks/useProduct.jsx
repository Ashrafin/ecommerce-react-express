import useFetch from "./useFetch";

const useProduct = (id) => {
  const url = `https://dummyjson.com/products/${id}`;
  const {
    data,
    isLoading,
    hasError,
    error
  } = useFetch(url);

  return {
    product: data,
    isLoading,
    hasError,
    error
  };
};

export default useProduct;