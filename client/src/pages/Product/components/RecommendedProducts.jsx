import ProductCard from "@/components/shared/ProductCard";

const RecommendedProducts = ({ products }) => {
  return (
    <>
      {products?.map((product) => <ProductCard key={product.id} product={product} />)}
    </>
  );
};

export default RecommendedProducts;