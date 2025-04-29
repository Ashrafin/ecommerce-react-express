import { useEffect, useState } from "react";

import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";
import Placeholder from "@/components/Placeholder";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);

  const _renderProducts = () => {
    if (error) return <div>Looks like there was an error</div>;
    if (isLoading) return (
      <>
        {[...Array(limit)].map((_, index) => (
          <Placeholder key={index} type="product card" />
        ))}
      </>
    );

    return (
      <>
        {products.map((product) => <ProductCard key={product.id} product={product} />)}
      </>
    );
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/?limit=${limit}&skip=${skip}`);
        const resData = await response.json();
        const data = resData.products;
        setProducts(data);
        setIsLoading(false);
        setError(false);
      } catch (err) {
        setError(true);
        console.error("Error fetching products: ", err);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    console.log(products);
    console.log(isLoading);
  }, [products, isLoading]);

  return (
    <Container utilityClasses="py-5">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {_renderProducts()}
      </div>
    </Container>
  );
};

export default HomePage;