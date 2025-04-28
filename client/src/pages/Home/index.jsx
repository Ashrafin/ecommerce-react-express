import { useEffect, useState } from "react";

import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products/?limit=20&skip=0");
        const resData = await response.json();
        const data = resData.products;
        setProducts(data);
        setIsLoading(false);
      } catch (err) {
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
        {products.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </Container>
  );
};

export default HomePage;