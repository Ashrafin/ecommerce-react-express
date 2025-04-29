import { useNavigate } from "react-router-dom";
import StarRatings from "@/components/StarRatings";
import "@/styles/ProductCard.styles.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const _renderPriceWithDiscount = () => {
    if (!product.discountPercentage) return <></>;
    const discountedPrice = product.price - (product.price * product.discountPercentage / 100);

    return (
      <p className="card-text text-success fs-6 fw-semibold me-2 mb-0">${discountedPrice.toFixed(2)}</p>
    );
  };

  const _renderOriginalPrice = () => {
    if (!product.discountPercentage) {
      return <p className="card-title text-success fw-semibold fs-6 mb-0">${product.price}</p>
    }

    return <p className="card-title text-secondary text-decoration-line-through text-opacity-50 fw-medium fs-6 mb-0">${product.price}</p>
  };

  const _renderCategory = () => {
    if (!product.category) return <></>;

    return <span className="badge rounded-pill text-bg-secondary fw-normal mb-2 me-1">{product.category}</span>;
  };

  const _renderTags = () => {
    if (!product.tags || !product.category) return <></>;
    const filteredTags = product.tags.filter(tag => tag.toLowerCase() !== product.category.toLowerCase());

    return (
      <>
        {filteredTags.map((tag) => <span key={tag} className="badge rounded-pill text-bg-primary fw-normal mb-2 me-1">{tag}</span>)}
      </>
    );
  };

  const goToProductPage = (productId) => {
    navigate(`/product/${productId}`)
  };

  return (
    <div className="col">
      <div className="card h-100">
        <img
          src={product.thumbnail}
          className="card-img-top object-fit-cover"
          style={{ height: 220, objectPosition: "center" }}
          alt={product.title}
        />
        <div className="card-body border-top">
          {_renderCategory()}
          {_renderTags()}
          <h5 className="card-title text-body-emphasis text-truncate mb-1">{product.title}</h5>
          <h6 className="card-subtitle text-body-secondary text-truncate fs-6 mb-0">{product.description}</h6>
          <StarRatings rating={product.rating} reviewCount={product.reviews.length} />
          <div className="d-flex mt-2 mb-2">
            {_renderPriceWithDiscount()}
            {_renderOriginalPrice()}
          </div>
          <button
            type="button"
            className="btn btn-link btn-sm p-0"
            onClick={() => goToProductPage(product.id)}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;