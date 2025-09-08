import { useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import useProduct from "@/hooks/useProduct";
import useRecommendedProducts from "@/hooks/useRecommendedProducts";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Placeholder from "@/components/ui/Placeholder";
import RenderWithFallback from "@/components/shared/RenderWithFallback";
import ProductCarousel from "./components/ProductCarousel";
import ProductInformation from "./components/ProductInformation";
import RecommendedProducts from "./components/RecommendedProducts";
import { fadeSlideUpProduct } from "@/animations/transitions/product";

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
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const _renderBreadcrumb = () => {
    return (
      <RenderWithFallback
        isLoading={productDetailsLoading}
        hasError={productDetailsHasError || !product?.title}
        fallback={<Placeholder type="breadcrumb" />}
        delay={1000}
      >
        <Breadcrumb
          items={[
            { label: "Back", onClick: handleBack },
            { label: product?.title }
          ]}
        />
      </RenderWithFallback>
    );
  };

  const _renderCarousel = () => {
    return (
      <RenderWithFallback
        isLoading={productDetailsLoading}
        hasError={productDetailsHasError || !product?.images?.length}
        fallback={<Placeholder type="carousel" />}
        delay={1000}
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
        delay={1000}
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
        delay={1000}
      >
        <div className="d-flex flex-column my-5">
          <h4 className="fs-4 fw-bold urbanist text-body-emphasis mb-4">Recommended</h4>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            <RecommendedProducts products={similarProducts} />
          </div>
        </div>
      </RenderWithFallback>
    );
  };

  return (
    <>
      <Container utilityClasses="py-4 px-3 px-md-4">
        <motion.div {...fadeSlideUpProduct}>
          {_renderBreadcrumb()}
          <div className="row">
            {_renderCarousel()}
            {_renderProductDetails()}
          </div>
          {_renderRecommendedProducts()}
        </motion.div>
      </Container>
    </>
  );
};

export default ProductPage;