import { useState } from "react";
import { motion } from "motion/react";
import useProducts from "@/hooks/useProducts";
import usePaginationParams from "@/hooks/usePaginationParams";
import useFilterParams from "@/hooks/useFilterParams";
import Container from "@/components/ui/Container";
import Placeholder from "@/components/ui/Placeholder";
import RenderWithFallback from "@/components/shared/RenderWithFallback";
import ProductCard from "@/components/shared/ProductCard";
import Pagination from "@/components/shared/Pagination";
import Filters from "@/components/shared/Filters";
import { fadeSlideUpHome } from "@/animations/transitions/home";

const HomePage = () => {
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
  } = useProducts({
    ...filters,
    limit,
    skip
  });
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    minPrice: null,
    maxPrice: null
  });

  const _renderProducts = () => {
    return (
      <RenderWithFallback
        isLoading={isLoading}
        hasError={hasError || !products}
        fallback={
          <>
            {[...Array(limit)].map((_, i) => (
              <Placeholder key={i} type="product card" />
            ))}
          </>
        }
        delay={1000}
      >
        <>
          {products?.map((product) => <ProductCard key={product.id} product={product} />)}
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

  return (
    <>
      <Container utilityClasses="py-5 px-3 px-md-4">
        <Filters
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
        <motion.div
          className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4"
          {...fadeSlideUpHome}
        >
          {_renderProducts()}
        </motion.div>
      </Container>
    </>
  );
};

export default HomePage;