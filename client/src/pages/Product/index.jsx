import { useParams } from "react-router-dom";
import { motion } from "motion/react";
import { easings } from "@/animations/easings";
import useProduct from "@/hooks/useProduct";
import useRecommendedProducts from "@/hooks/useRecommendedProducts";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Placeholder from "@/components/ui/Placeholder";
import RenderWithFallback from "@/components/shared/RenderWithFallback";
import ProductCarousel from "./components/ProductCarousel";
import ProductInformation from "./components/ProductInformation";
import RecommendedProducts from "./components/RecommendedProducts";

const ProductPage = () => {
  const { id } = useParams();
  const {
    product,
    isLoading: productDetailsLoading,
    hasError: productDetailsHasError,
    error: productDetailsError
  } = useProduct(id);
  const {
    similarProducts,
    isLoading: similarProductsLoading,
    hasError: similarProductsHasError,
    error: similarProductsError
  } = useRecommendedProducts(product?.category, product?.id);

  const fadeInOutTransition = {
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 1,
        delay: 0.6,
        ease: easings.easeInQuad
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.6,
        ease: easings.easeOutQuad
      }
    }
  };

  const fadeSlideUpTransition = {
    initial: {
      opacity: 0,
      y: 50
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: easings.easeInQuad
      }
    },
    exit: {
      opacity: 0,
      y: 50,
      transition: {
        duration: 0.8,
        ease: easings.easeOutQuad
      }
    }
  };

  const _renderBreadcrumb = () => {
    return (
      <RenderWithFallback
        isLoading={productDetailsLoading}
        hasError={productDetailsHasError || !product?.title}
        fallback={<Placeholder type="breadcrumb" />}
      >
        <motion.div
          {...fadeInOutTransition}
        >
          <Breadcrumb
            items={[
              { label: "Home", to: "/" },
              { label: product?.title }
            ]}
          />
        </motion.div>
      </RenderWithFallback>
    );
  };

  const _renderCarousel = () => {
    return (
      <RenderWithFallback
        isLoading={productDetailsLoading}
        hasError={productDetailsHasError || !product?.images?.length}
        fallback={<Placeholder type="carousel" />}
      >
        <ProductCarousel images={product?.images} />
      </RenderWithFallback>
    );
  };

  const _renderProductDetails = () => {
    return (
      <RenderWithFallback
        isLoading={productDetailsLoading}
        hasError={productDetailsHasError || !product}
        fallback={<Placeholder type="product details" />}
      >
        <ProductInformation product={product} />
      </RenderWithFallback>
    );
  };

  const _renderRecommendedProducts = () => {
    return (
      <RenderWithFallback
        isLoading={similarProductsLoading}
        hasError={similarProductsHasError || !similarProducts?.length}
        fallback={<Placeholder type="recommended products" />}
      >
        <motion.div
          {...fadeSlideUpTransition}
          className="d-flex flex-column my-5"
        >
          <h4 className="fs-4 fw-bold urbanist text-body-emphasis mb-4">Recommended</h4>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            <RecommendedProducts products={similarProducts} />
          </div>
        </motion.div>
      </RenderWithFallback>
    );
  };

  return (
    <>
      <Container utilityClasses="py-4 px-3 px-md-4">
        {_renderBreadcrumb()}
        <div className="row">
          {_renderCarousel()}
          {_renderProductDetails()}
        </div>
        {_renderRecommendedProducts()}
      </Container>
    </>
  );
};

export default ProductPage;