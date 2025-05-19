import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import Placeholder from "@/components/ui/Placeholder";
import RenderWithFallback from "@/components/shared/RenderWithFallback";
import ProductCard from "./components/ProductCard";
import useFetch from "@/hooks/useFetch";
import useProducts from "@/hooks/useProducts";

const HomePage = () => {
  const [limit, setLimit] = useState(20);
  const [skip, setSkip] = useState(0);
  const { products, isLoading, hasError, error } = useProducts(limit, skip);

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
          {products?.map((product) => <ProductCard key={product.id} product={product} />)}
        </>
      </RenderWithFallback>
    );
  };

  // useEffect(() => {
  //   console.log(products, "products");
  //   console.log(isLoading, "loading");
  // }, [products, isLoading]);

  return (
    <Container utilityClasses="py-5">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {_renderProducts()}
      </div>
    </Container>
  );
};

export default HomePage;