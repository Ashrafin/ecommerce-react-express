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
  const url = `${baseUrl}limit=0`;
  const {
    data,
    isLoading,
    hasError,
    error
  } = useFetch(url);

  const { products, total, filteredTotal } = useMemo(() => {
    if (!data?.products?.length) return { products: [], total: 0, filteredTotal: 0 };

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

    const filteredCount = result.length;

    if (
      sort === "asc" ||
      sort === null
    ) {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "desc") {
      result.sort((a, b) => b.price - a.price);
    }

    const paginatedResult = result.slice(skip, skip + limit);

    return {
      products: paginatedResult,
      total: data?.total ?? 0,
      filteredTotal: filteredCount
    };
  }, [
    data,
    filters,
    sort,
    limit,
    skip
  ]);

  const hasActiveFilters =
    (filters.categories && filters.categories.length > 0) ||
    filters.minPrice !== null ||
    filters.maxPrice !== null;

  return {
    products,
    total,
    filteredTotal,
    isFiltered: hasActiveFilters,
    isLoading,
    hasError,
    error
  };
};

export default useProducts;