import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import ProductCarousel from "./components/ProductCarousel";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ProductInformation from "./components/ProductInformation";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const _renderBreadcrumb = () => {
    if (!product?.title) return <></>;

    return (
      <Breadcrumb
        items={[
          { label: "Home", to: "/" },
          { label: product.title }
        ]}
      />
    );
  };

  const _renderCarousel = () => {
    if (!product?.images?.length) return <></>;

    return <ProductCarousel product={product} />;
  };

  const _renderDetails = () => {
    if (!product) return <></>;

    return <ProductInformation product={product} />;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const resData = await response.json();
        const data = resData;
        setProduct(data);
        setIsLoading(false);
        setError(false);
      } catch (err) {
        setError(true);
        console.error("Error fetching product: ", err);
      }
    };

    fetchProduct();
  }, []);

  useEffect(() => {
    console.log(product);
  }, [product, isLoading]);

  return (
    <Container utilityClasses="p-4">
      {_renderBreadcrumb()}
      <div className="row">
        {_renderCarousel()}
        {_renderDetails()}
      </div>
    </Container>
  );
};

export default ProductPage;