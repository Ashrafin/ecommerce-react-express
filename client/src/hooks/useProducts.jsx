import { useMemo } from "react";
import useFetch from "./useFetch";

const useProducts = ({
  limit = 20,
  skip = 0,
  filters = {},
  sort,
  query = null
}) => {
  const baseUrl = query
    ? `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}&`
    : `https://dummyjson.com/products?`;
  const url = `${baseUrl}limit=${limit}&skip=${skip}`;
  const {
    data,
    isLoading,
    hasError,
    error
  } = useFetch(url);

  const { products, total } = useMemo(() => {
    if (!data?.products?.length) return { products: [], total: 0 };

    let result = [...data.products];

    if (filters.categories?.length) {
      result = result.filter((product) => filters.categories.includes(product.category));
    }

    if (
      filters.minPrice !== null &&
      filters.minPrice !== undefined
    ) {
      result = result.filter((product) => product.price >= filters.minPrice);
    }

    if (
      filters.maxPrice !== null &&
      filters.maxPrice !== undefined
    ) {
      result = result.filter((product) => product.price <= filters.maxPrice);
    }

    if (
      sort === "asc" ||
      sort === null
    ) {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return {
      products: result,
      total: data?.total ?? 0
    };
  }, [
    data,
    filters,
    sort,
    limit,
    skip
  ]);

  const filteredProducts = useMemo(() => {
    if (!data?.products) return [];

    return data.products.filter(product => {
      const matchesCategory =
        !filters.categories.length ||
        filters.categories.includes(product.category);

      const matchesMinPrice =
        filters.minPrice === null ||
        product.price >= filters.minPrice;

      const matchesMaxPrice =
        filters.maxPrice === null ||
        product.price <= filters.maxPrice;

      return matchesCategory && matchesMinPrice && matchesMaxPrice;
    });
  }, [data?.products, filters]);

  const hasActiveFilters =
    (filters.categories && filters.categories.length > 0) ||
    filters.minPrice !== null ||
    filters.maxPrice !== null;

  return {
    products,
    total,
    filteredTotal: filteredProducts.length,
    isFiltered: hasActiveFilters,
    isLoading,
    hasError,
    error
  };
};

export default useProducts;