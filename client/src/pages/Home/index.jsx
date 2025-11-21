import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useCartStore } from "@/store/useCartStore";
import useProducts from "@/hooks/useProducts";
import usePaginationParams from "@/hooks/usePaginationParams";
import Container from "@/components/ui/Container";
import Placeholder from "@/components/ui/Placeholder";
import RenderWithFallback from "@/components/shared/RenderWithFallback";
import ProductCard from "@/components/shared/ProductCard";
import Pagination from "@/components/shared/Pagination";
import Filters from "@/components/shared/Filters";
import { fadeSlideUpHome } from "@/animations/transitions/home";

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

  // const cartItems = useCartStore(store => store.items);
  // console.log("cart items: ", cartItems);

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
          <>
            {[...Array(limit)].map((_, i) => <Placeholder key={i} type="product card" />)}
          </>
        }
        delay={1000}
      >
        <>
          {products?.map((product) => <ProductCard key={product.id} product={product} />)}
          {products.length > 0 && (
            <Pagination
              currentPage={page}
              totalItems={isFiltered ? filteredTotal : total}
              itemsPerPage={limit}
              handlePageChange={setPage}
            />
          )}
        </>
      </RenderWithFallback>
    );
  };

  return (
    <>
      <Container utilityClasses="py-5 px-3 px-md-4">
        <Filters appliedFilters={filters} availableCategories={categories} />
        {isFiltered && products.length < 1 && <h5 className="text-center urbanist fw-semibold">No Results Found</h5>}
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