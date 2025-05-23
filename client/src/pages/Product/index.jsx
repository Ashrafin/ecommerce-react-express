import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Placeholder from "@/components/ui/Placeholder";
import RenderWithFallback from "@/components/shared/RenderWithFallback";
import ProductCarousel from "./components/ProductCarousel";
import ProductInformation from "./components/ProductInformation";
import useProduct from "@/hooks/useProduct";
import useRecommendedProducts from "@/hooks/useRecommendedProducts";
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

  const _renderBreadcrumb = () => {
    return (
      <RenderWithFallback
        isLoading={productDetailsLoading}
        hasError={productDetailsHasError || !product?.title}
        fallback={<Placeholder type="breadcrumb" />}
      >
        <Breadcrumb
          items={[
            { label: "Home", to: "/" },
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
        fallback={<div>Loading...</div>}
      >
        <div className="d-flex flex-column my-5">
          <h4 className="fs-4 fw-semibold text-dark-emphasis mb-4">Recommended</h4>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            <RecommendedProducts products={similarProducts} />
          </div>
        </div>
      </RenderWithFallback>
    );
  };
  
  useEffect(() => {
    console.log("product: ", product);
    console.log("similar products: ", similarProducts);
  }, [product, similarProducts]);

  return (
    <Container utilityClasses="py-4 px-3 px-md-4">
      {_renderBreadcrumb()}
      <div className="row">
        {_renderCarousel()}
        {_renderProductDetails()}
      </div>
      {_renderRecommendedProducts()}
    </Container>
  );
};

export default ProductPage;