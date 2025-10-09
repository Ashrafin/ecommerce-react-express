import { useSearchParams } from "react-router-dom";

const DEFAULT_FILTERS = {
  category: "",
  minPrice: "",
  maxPrice: "",
  // sort: "asc"
};

const useFilterParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = {
    category: searchParams.get("category") || DEFAULT_FILTERS.category,
    minPrice: searchParams.get("minPrice") || DEFAULT_FILTERS.minPrice,
    maxPrice: searchParams.get("maxPrice") || DEFAULT_FILTERS.maxPrice,
    // sort: searchParams.get("sort") || DEFAULT_FILTERS.sort,
  };

  const setFilters = (newFilters) => {
    const updated = new URLSearchParams(searchParams);

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        updated.set(key, value);
      } else {
        updated.delete(key);
      }
    });

    setSearchParams(updated, { replace: true });
  };

  return { filters, setFilters };
};

export default useFilterParams;