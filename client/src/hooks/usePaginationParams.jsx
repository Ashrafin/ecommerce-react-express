import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const DEFAULTS = {
  page: 1,
  limit: 20,
  sort: null,
  filters: {
    categories: [],
    minPrice: null,
    maxPrice: null
  }
};

const usePaginationParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useMemo(() => {
    const page = Number(searchParams.get("page")) || DEFAULTS.page;
    const limit = Number(searchParams.get("limit")) || DEFAULTS.limit;
    const sort = searchParams.get("sort") || DEFAULTS.sort;
    const filters = {
      categories: searchParams.getAll("categories"),
      minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : null,
      maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : null
    };

    return {
      page,
      limit,
      sort,
      filters
    };
  }, [searchParams]);

  const skip = useMemo(() => (params.page - 1) * params.limit, [params.page, params.limit]);

  const setParams = (key, value) => {
    const newParams = new URLSearchParams(searchParams);

    if (
      value === null || 
      value === undefined ||
      value === "" || 
      (Array.isArray(value) && value.length === 0)
    ) {
      newParams.delete(key);
    } else if (Array.isArray(value)) {
      newParams.delete(key);
      value.forEach((val) => newParams.append(key, val));
    } else {
      newParams.set(key, value);
    }

    setSearchParams(newParams, { replace: true });
  };

  const setAllFilters = (filterObj) => {
    const newParams = new URLSearchParams(searchParams);

    Object.keys(filterObj).forEach(key => newParams.delete(key));

    Object.entries(filterObj).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((val) => {
          if (
            val !== null && 
            val !== undefined && 
            val !== ""
          ) {
            newParams.append(key, val);
          }
        });
      } else if (
        value !== null && 
        value !== undefined && 
        value !== ""
      ) {
        newParams.set(key, value);
      }
    });

    setSearchParams(newParams, { replace: true });
  };

  return {
    page: params.page,
    limit: params.limit,
    skip,
    sort: params.sort,
    filters: params.filters,
    setPage: (newPage) => setParams("page", newPage),
    setLimit: (newLimit) => setParams("limit", newLimit),
    setSort: (newSort) => setParams("sort", newSort),
    setAllFilters
  };
};

export default usePaginationParams;