import {
  useEffect,
  useState
} from "react";
import useProducts from "@/hooks/useProducts";
import usePaginationParams from "@/hooks/usePaginationParams";
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

const HomePage = () => {
  const [categories, setCategories] = useState([]);
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
    sort
  });

  useEffect(() => {
    const fetchAllCategories = async () => {
      const res = await fetch("https://dummyjson.com/products/category-list");
      const data = await res.json();
      setCategories(data);
    };

    fetchAllCategories();
  }, []);

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
            {isFiltered && products.length < 1 && <h5 className="text-center urbanist fw-semibold">No Results Found</h5>}
            {_renderProducts()}
          </motion.div>
        </motion.div>
      </Container>
    </>
  );
};

export default HomePage;