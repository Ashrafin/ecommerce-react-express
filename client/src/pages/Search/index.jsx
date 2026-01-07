import {
  useEffect,
  useState
} from "react";
import { useLocation } from "react-router-dom";
import usePaginationParams from "@/hooks/usePaginationParams";
import useProducts from "@/hooks/useProducts";
import Container from "@/components/ui/Container";
import Placeholder from "@/components/ui/Placeholder";
import RenderWithFallback from "@/components/shared/RenderWithFallback";
import ProductCard from "@/components/shared/ProductCard";
import Pagination from "@/components/shared/Pagination";
import Filters from "@/components/shared/Filters";
import { motion } from "motion/react";
import {
  staggeredContainerVariants,
  staggeredItemVariants
} from "@/animations/transitions/staggered";

const SearchPage = () => {
  const { search } = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const {
    page,
    limit,
    skip,
    sort,
    setPage,
    filters
  } = usePaginationParams();
  const {
    products,
    total,
    filteredTotal,
    isFiltered,
    isLoading,
    hasError,
    error
  } = useProducts({
    limit,
    skip,
    filters,
    sort,
    query: searchQuery
  });

  const categories = [...new Set(products.map(product => product.category))];

  const _renderHeader = () => {
    return (
      <RenderWithFallback
        isLoading={isLoading}
        hasError={hasError || !products || products.length < 1}
        fallback={
          <>
            <h3 className="fw-semibold fs-4 urbanist text-body-emphasis mb-4">
              Looks like nothing was found for: {searchQuery}
            </h3>
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
          <motion.div
            className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4"
            variants={staggeredContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            key="placeholders"
          >
            {[...Array(limit)].map((_, i) => (
              <motion.div
                key={i}
                variants={staggeredItemVariants}
              >
                <Placeholder type="product card" />
              </motion.div>
            ))}
          </motion.div>
        }
        delay={1000}
      >
        <motion.div
          className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4"
          variants={staggeredContainerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          key="products"
        >
          {products?.map((product) => (
            <motion.div
              key={product.id}
              variants={staggeredItemVariants}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
          {products.length > 0 && (
            <Pagination
              currentPage={page}
              totalItems={isFiltered ? filteredTotal : total}
              itemsPerPage={limit}
              handlePageChange={setPage}
            />
          )}
        </motion.div>
      </RenderWithFallback>
    );
  };

  useEffect(() => {
    const q = new URLSearchParams(search).get("q");
    setSearchQuery(q || "");
  }, [search]);

  return (
    <>
      <Container utilityClasses="py-5 px-3 px-md-4">
        <motion.div
          variants={staggeredContainerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div variants={staggeredItemVariants}>
            <Filters
              appliedFilters={filters}
              availableCategories={categories}
            />
          </motion.div>
          <motion.div variants={staggeredItemVariants}>
            {_renderHeader()}
          </motion.div>
          <motion.div variants={staggeredItemVariants}>
            {_renderProducts()}
          </motion.div>
        </motion.div>
      </Container>
    </>
  );
};

export default SearchPage;