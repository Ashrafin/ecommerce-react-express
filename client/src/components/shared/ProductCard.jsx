import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/store/useCartStore";
import StarRatings from "@/components/ui/StarRatings";
import "@/styles/ProductCard.styles.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const addItemToCart = useCartStore(store => store.addItem);

  const _renderCategory = () => {
    if (!product.category) return <></>;

    return (
      <span className="badge rounded-pill bg-light text-body-emphasis text-capitalize inter fw-normal mb-2 me-2 border border-light-subtle">
        {product.category}
      </span>
    );
  };

  const _renderTags = () => {
    if (!product.tags || !product.category) return <></>;
    const filteredTags = product.tags.filter(tag => tag.toLowerCase() !== product.category.toLowerCase());

    return (
      <>
        {filteredTags.map((tag) => (
          <span
            key={tag}
            className="badge rounded-pill bg-light text-body-emphasis text-capitalize inter fw-normal mb-2 me-2 border border-light-subtle"
          >
            {tag}
          </span>
        ))}
      </>
    );
  };

  const _renderPriceWithDiscount = () => {
    if (!product.discountPercentage) return <></>;
    const discountedPrice = product.price - (product.price * product.discountPercentage / 100);

    return (
      <p className="card-text text-success urbanist fs-5 fw-bold me-2 mb-0">
        ${discountedPrice.toFixed(2)}
      </p>
    );
  };

  const _renderOriginalPrice = () => {
    if (!product.discountPercentage) {
      return (
        <p className="card-title text-success urbanist fw-bold fs-5 mb-0">
          ${product.price}
        </p>
      );
    }

    return (
      <p className="card-title text-secondary text-decoration-line-through text-opacity-50 urbanist fw-medium fs-5 mb-0">
        ${product.price}
      </p>
    );
  };

  const goToProductPage = (productId) => {
    navigate(`/product/${productId}`)
  };

  const discountPercentage = Math.floor(product.discountPercentage);

  return (
    <div className="col">
      <div className="card product-card h-100 border-1 border-light-subtle rounded-5 position-relative bg-light">
        {discountPercentage >= 1 && (
          <div className="d-flex flex-row discount-percentage rounded-5 bg-danger bg-opacity-25 py-1 px-2 position-absolute">
            <i className="bi bi-tag-fill text-danger fs-7 me-2" />
            <p className="text-danger urbanist fw-bold fs-7 mb-0">
              -{discountPercentage}%
            </p>
          </div>
        )}
        <img
          src={product.thumbnail}
          className="card-img-top object-fit-contain bg-light"
          alt={product.title}
        />
        <div className="d-flex flex-column card-body justify-content-between border-top border-1 border-light-subtle bg-white">
          <div className="d-flex flex-wrap mb-2">
            {_renderCategory()}
            {_renderTags()}
          </div>
          <div className="d-flex flex-column">
            <h5 className="card-title text-body-emphasis text-truncate urbanist fs-5 fw-bold mb-2">
              {product.title}
            </h5>
            <h6 className="card-subtitle text-body-secondary text-truncate inter fs-7 fw-normal mb-0">
              {product.description}
            </h6>
            <StarRatings
              rating={product.rating}
              reviewCount={product.reviews.length}
              starSize="sm"
            />
            {product.stock > 0 ? (
              <p className="inter fs-8 fw-medium text-success mb-0">
                In Stock
              </p>
            ) : (
              <p className="inter fs-8 fw-medium text-danger mb-0">
                Out of Stock
              </p>
            )}
            <div className="d-flex mt-2 mb-2">
              {_renderPriceWithDiscount()}
              {_renderOriginalPrice()}
            </div>
            <div className="d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-sm bg-info-subtle text-info-emphasis border-0 rounded-pill inter fw-medium flex-grow-1 me-1"
                onClick={() => goToProductPage(product.id)}
              >
                View Details
              </button>
              {product.stock > 0 && (
                <button
                  type="button"
                  className="btn btn-sm bg-info-subtle border-0 px-3 rounded-pill ms-1"
                  onClick={() => addItemToCart(product)}
                >
                  <i className="bi bi-bag-fill text-info-emphasis fs-6" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;