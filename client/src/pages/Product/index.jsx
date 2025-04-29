import { useParams } from "react-router-dom";

const ProductPage = () => {
  const { id } = useParams();

  return (
    <div>This is the product page with product ID: {id}!</div>
  );
};

export default ProductPage;