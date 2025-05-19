import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Placeholder from "@/components/ui/Placeholder";
import RenderWithFallback from "@/components/shared/RenderWithFallback";
import ProductCarousel from "./components/ProductCarousel";
import ProductInformation from "./components/ProductInformation";
import useProduct from "@/hooks/useProduct";

const ProductPage = () => {
  const { id } = useParams();
  const { product, isLoading, hasError, error } = useProduct(id);

  const _renderBreadcrumb = () => {
    return (
      <RenderWithFallback
        isLoading={isLoading}
        hasError={hasError || !product?.title}
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
        isLoading={isLoading}
        hasError={hasError || !product?.images?.length}
        fallback={<Placeholder type="carousel" />}
      >
        <ProductCarousel images={product?.images} />
      </RenderWithFallback>
    );
  };

  const _renderProductDetails = () => {
    return (
      <RenderWithFallback
        isLoading={isLoading}
        hasError={hasError}
        fallback={<Placeholder type="product details" />}
      >
        <ProductInformation product={product} />
      </RenderWithFallback>
    );
  };
  
  // useEffect(() => {
  //   console.log(product);
  // }, [product, isLoading]);

  return (
    <Container fluid>
      <Container utilityClasses="py-4 px-3 px-md-4">
        {_renderBreadcrumb()}
        <div className="row">
          {_renderCarousel()}
          {_renderProductDetails()}
        </div>
      </Container>
    </Container>
  );
};

export default ProductPage;