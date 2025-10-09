import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "motion/react";
import useSearch from "@/hooks/useSearch";
import usePaginationParams from "@/hooks/usePaginationParams";
import useFilterParams from "@/hooks/useFilterParams";
import Container from "@/components/ui/Container";
import Placeholder from "@/components/ui/Placeholder";
import RenderWithFallback from "@/components/shared/RenderWithFallback";
import ProductCard from "@/components/shared/ProductCard";
import Pagination from "@/components/shared/Pagination";
import { fadeSlideUpSearch } from "@/animations/transitions/search";

const SearchPage = () => {
  const { search } = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const {
    page,
    limit,
    skip,
    setPage
  } = usePaginationParams();
  const { filters } = useFilterParams();
  const {
    products,
    total,
    isLoading,
    hasError,
    error
  } = useSearch({
    query: searchQuery,
    ...filters,
    limit,
    skip
  });

  const _renderHeader = () => {
    return (
      <RenderWithFallback
        isLoading={isLoading}
        hasError={hasError || !products || products.length < 1}
        fallback={
          <>
            <h3 className="fw-semibold fs-4 urbanist text-body-emphasis mb-4">Looks like nothing was found for: {searchQuery}</h3>
          </>
        }
        delay={1000}
      >
        <h3 className="fw-semibold fs-4 urbanist text-body-emphasis mb-4">
          Search results for: {searchQuery} <span className="fs-5 text-body-tertiary">({total})</span>
        </h3>
      </RenderWithFallback>
    )
  };

  const _renderProducts = () => {
    return (
      <RenderWithFallback
        isLoading={isLoading}
        hasError={hasError || !products}
        fallback={
          <>
            {[...Array(limit)].map((_, i) => <Placeholder key={i} type="product card" />)}
          </>
        }
        delay={1000}
      >
        <>
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          <Pagination
            currentPage={page}
            totalItems={total}
            itemsPerPage={limit}
            handlePageChange={setPage}
          />
        </>
      </RenderWithFallback>
    );
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(search);
    const q = queryParams.get("q");
    setSearchQuery(q || "");
  }, [search]);

  return (
    <>
      <Container utilityClasses="py-5 px-3 px-md-4">
        <motion.div className="w-100" {...fadeSlideUpSearch}>
          {_renderHeader()}
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
            {_renderProducts()}
          </div>
        </motion.div>
      </Container>
    </>
  );
};

export default SearchPage;