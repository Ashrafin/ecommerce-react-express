import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import useSearch from "@/hooks/useSearch";
import usePaginationParams from "@/hooks/usePaginationParams";
import Container from "@/components/ui/Container";
import Placeholder from "@/components/ui/Placeholder";
import RenderWithFallback from "@/components/shared/RenderWithFallback";
import ProductCard from "@/components/shared/ProductCard";
import Pagination from "@/components/shared/Pagination";
import { easings } from "@/animations/easings";

const SearchPage = () => {
  const { search } = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const { page, limit, skip, setPage } = usePaginationParams();
  const { products, total, isLoading, hasError, error } = useSearch(searchQuery, limit, skip);
  const fadeSlideUpTransition = {
    initial: {
      opacity: 0,
      y: 50
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easings.easeInQuad
      }
    },
    exit: {
      opacity: 0,
      y: 50,
      transition: {
        duration: 0.6,
        ease: easings.easeOutQuad
      }
    }
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
      >
        <>
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
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
        <AnimatePresence mode="wait">
          {Array.isArray(products) && products.length < 1 ? (
            <motion.h3
              key="no-results"
              className="fw-semibold fs-4 urbanist text-body-emphasis mb-0"
              {...fadeSlideUpTransition}
            >
              Looks like nothing was found for: {searchQuery}
            </motion.h3>
          ) : (
            <>
              <motion.h3
                key="results"
                className="fw-semibold fs-4 urbanist text-body-emphasis mb-4"
                {...fadeSlideUpTransition}
              >
                Search results for: {searchQuery} <span className="fs-5 text-body-tertiary">({total})</span>
              </motion.h3>
              <motion.div
                className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4"
                {...fadeSlideUpTransition}
              >
                {_renderProducts()}
                <Pagination
                  currentPage={page}
                  totalItems={total}
                  itemsPerPage={limit}
                  handlePageChange={setPage}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </Container>
    </>
  );
};

export default SearchPage;