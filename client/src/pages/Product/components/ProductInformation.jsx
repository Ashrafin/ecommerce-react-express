import StarRatings from "@/components/ui/StarRatings";
import ProductTabs from "./ProductTabs";

const ProductInformation = ({ product }) => {
  if (!product) return <></>;

  const filteredTags = product.tags.filter(tag => tag.toLowerCase() !== product.category.toLowerCase());
  const discountedPrice = product.price - (product.price * product.discountPercentage / 100);
  const discountPercentage = Math.floor(product.discountPercentage);

  return (
    <div className="col-12 col-lg-6 col-lg-5 pt-4 ps-lg-5 pt-lg-0">
      <p className="fs-5 fw-semibold text-body-emphasis urbanist mb-2">
        {product.brand}
      </p>
      <div className="d-flex mb-3">
        <span className="badge rounded-pill bg-light text-body-emphasis text-capitalize inter fw-normal me-1 border border-light-subtle">
          {product.category}
        </span>
        {filteredTags.map((tag) => (
          <span
            key={tag}
            className="badge rounded-pill bg-light text-body-emphasis text-capitalize inter fw-normal me-1 border border-light-subtle"
          >
            {tag}
          </span>
        ))}
      </div>
      <h1 className="fs-1 fw-bold text-body-emphasis urbanist mt-4 mb-0">
        {product.title}
      </h1>
      <h3 className="fs-6 fw-normal lh-base text-body-secondary inter my-1">
        {product.description}
      </h3>
      <StarRatings rating={product.rating} reviewCount={product.reviews.length} starSize="lg" />
      <div className="d-flex justify-content-between align-items-center my-4">
        <div className="d-flex flex-column">
          <div className={`d-flex flex-row ${discountPercentage >= 1 ? "mb-2" : ""}`}>
            <h4 className="fs-4 urbanist fw-bold text-success me-2 mb-0">${discountedPrice.toFixed(2)}</h4>
            <h4 className="fs-4 urbanist fw-medium text-secondary text-decoration-line-through text-opacity-50 mb-0">
              ${product.price}
            </h4>
          </div>
          {discountPercentage >= 1 && (
            <div style={{ width: "fit-content" }} className="d-flex bg-danger-subtle rounded-5 px-2 py-1">
              <i className="bi bi-tag-fill text-danger fs-6 me-2" />
              <p className="text-danger urbanist fw-bold fs-6 mb-0">-{discountPercentage}%</p>
            </div>
          )}
        </div>
        <button
          onClick={() => console.log(`add product with id: ${product.id} to the cart`)}
          type="button"
          className="btn bg-info-subtle text-info-emphasis border-0 rounded-pill urbanist fw-semibold px-4"
        >
          Add to Cart
        </button>
      </div>
      {product && (
        <ProductTabs
          weight={product.weight}
          warrantyInformation={product.warrantyInformation}
          dimensions={product.dimensions}
          returnPolicy={product.returnPolicy}
          shippingInformation={product.shippingInformation}
          reviews={product.reviews}
        />
      )}
    </div>
  );
};

export default ProductInformation;