import { useEffect, useState } from "react";
import usePaginationParams from "./usePaginationParams";

const DEFAULT_FILTERS = {
  categories: [],
  minPrice: null,
  maxPrice: null
};

const useFilters = () => {
  const {
    filters: urlFilters,
    setAllFilters
  } = usePaginationParams();
  const [draftFilters, setDraftFilters] = useState(DEFAULT_FILTERS);

  const applyFilters = () => {
    setAllFilters({
      limit: urlFilters.limit,
      sort: urlFilters.sort,
      page: 1,
      ...draftFilters
    });
  };

  const clearFilters = () => {
    setDraftFilters(DEFAULT_FILTERS);
    setAllFilters(DEFAULT_FILTERS);
  };

  const areFiltersEqual = (a, b) => {
    return (
      JSON.stringify(a.categories ?? []) === JSON.stringify(b.categories ?? []) &&
      a.minPrice === b.minPrice &&
      a.maxPrice === b.maxPrice
    );
  };

  useEffect(() => {
    if (!areFiltersEqual(urlFilters, draftFilters)) {
      setDraftFilters({
        categories: urlFilters.categories || [],
        minPrice: urlFilters.minPrice ?? null,
        maxPrice: urlFilters.maxPrice ?? null,
      });
    }
  }, [urlFilters]);

  return {
    draftFilters,
    setDraftFilters,
    applyFilters,
    clearFilters
  };
};

export default useFilters;