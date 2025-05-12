import StarRatings from "../StarRatings";
import ProductDetailTabs from "../ProductDetailTabs";

const ProductDetail = ({ product }) => {
  const filteredTags = product.tags.filter(tag => tag.toLowerCase() !== product.category.toLowerCase());
  const discountedPrice = product.price - (product.price * product.discountPercentage / 100);

  return (
    <div className="col-12 col-lg-6 col-lg-5 pt-4 ps-lg-5 pt-lg-0">
      <p className="fs-6 fw-bolder text-dark-emphasis mb-0">{product.brand}</p>
      <div className="d-flex my-2">
        <span className="badge rounded-pill text-bg-light fw-normal me-1 border border-light-subtle">{product.category}</span>
        {filteredTags.map((tag) => (
          <span
            key={tag}
            className="badge rounded-pill text-bg-light fw-normal me-1 border border-light-subtle"
          >
            {tag}
          </span>
        ))}
      </div>
      <h1 className="fs-1 fw-bold text-dark my-2">{product.title}</h1>
      <StarRatings rating={product.rating} reviewCount={product.reviews.length} starSize="lg" />
      <h3 className="fs-6 fw-normal lh-base text-body-secondary my-2">{product.description}</h3>
      <div className="d-flex align-items-baseline mt-4 mb-2">
        <h4 className="fs-2 fw-bolder text-success me-3">${discountedPrice.toFixed(2)}</h4>
        <h4 className="fs-4 fw-medium text-secondary text-decoration-line-through text-opacity-50">${product.price}</h4>
      </div>
      {product && (
        <ProductDetailTabs
          weight={product.weight}
          warrantyInformation={product.warrantyInformation}
          dimensions={product.dimensions}
          returnPolicy={product.returnPolicy}
          shippingInformation={product.shippingInformation}
        />
      )}
    </div>
  );
};

export default ProductDetail;