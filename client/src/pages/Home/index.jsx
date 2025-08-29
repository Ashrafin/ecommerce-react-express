import { motion } from "motion/react";
import useProducts from "@/hooks/useProducts";
import Container from "@/components/ui/Container";
import Placeholder from "@/components/ui/Placeholder";
import RenderWithFallback from "@/components/shared/RenderWithFallback";
import ProductCard from "@/components/shared/ProductCard";
import Pagination from "@/components/shared/Pagination";
import { easings } from "@/animations/easings";
import usePaginationParams from "@/hooks/usePaginationParams";

const HomePage = () => {
  const { page, limit, skip, setPage } = usePaginationParams();
  const { products, total, isLoading, hasError, error } = useProducts(limit, skip);

  const fadeSlideUpTransition = {
    initial: {
      opacity: 0,
      y: 50
    },
    animate: {
      opacity: 1,
      y: 0
    },
    exit: {
      opacity: 0,
      y: 50
    },
    transition: {
      duration: 1.3,
      ease: easings.easeInOutQuad
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

  return (
    <>
      <Container utilityClasses="py-5 px-3 px-md-4">
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
      </Container>
    </>
  );
};

export default HomePage;