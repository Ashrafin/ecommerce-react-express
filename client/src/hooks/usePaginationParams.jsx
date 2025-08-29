import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const usePaginationParams = (
  defaults = {
    page: 1,
    limit: 20,
    sort: "asc",
    filters: {}
  }
) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || defaults.page, 10);
  const limit = parseInt(searchParams.get("limit") || defaults.limit, 10);
  const sort = searchParams.get("sort") || defaults.sort;
  const skip = (page - 1) * limit;
  const filters = {};

  searchParams.forEach((value, key) => {
    if (!["page", "limit", "sort"].includes(key)) {
      filters[key] = value;
    }
  });

  const setParams = (key, value) => {
    const newParams = new URLSearchParams(searchParams);

    if (value == null || value === "") {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }

    setSearchParams(newParams);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  useEffect(() => {
    let updated = false;
    const newParams = new URLSearchParams(searchParams);

    if (!searchParams.get("page")) {
      newParams.set("page", defaults.page);
      updated = true;
    }

    if (!searchParams.get("limit")) {
      newParams.set("limit", defaults.limit);
      updated = true;
    }

    if (!searchParams.get("sort")) {
      newParams.set("sort", defaults.sort);
      updated = true;
    }

    if (updated) setSearchParams(newParams);
  }, [searchParams, setSearchParams, defaults]);

  return {
    page,
    limit,
    skip,
    sort,
    filters,
    setPage: (newPage) => setParams("page", newPage),
    setLimit: (newLimit) => setParams("limit", newLimit),
    setSort: (newSort) => setParams("sort", newSort),
    setFilters: (key, value) => setParams(key, value)
  };
};

export default usePaginationParams;