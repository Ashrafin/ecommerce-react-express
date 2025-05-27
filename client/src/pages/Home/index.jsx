import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import Placeholder from "@/components/ui/Placeholder";
import RenderWithFallback from "@/components/shared/RenderWithFallback";
import ProductCard from "@/components/shared/ProductCard";
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

  // remember to remove this
  // useEffect(() => {
  //   console.log(products, "products");
  //   console.log(isLoading, "loading");
  // }, [products, isLoading]);

  return (
    <Container utilityClasses="py-5 px-3 px-md-4">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
        {_renderProducts()}
      </div>
    </Container>
  );
};

export default HomePage;