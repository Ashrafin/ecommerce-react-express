import { useNavigate } from "react-router-dom";

const RecentlyViewedItems = ({ recentlyViewedProducts }) => {
  const navigate = useNavigate();

  const handleGoToProductPage = (productId) => {
    navigate(`/product/${productId}`)
  };

  return (
    <div className="d-flex flex-column mt-5">
      <h4 className="fs-4 fw-bold urbanist text-body-emphasis mb-1">
        Recently Viewed
      </h4>
      <h6 className="inter fs-7 fw-normal text-body-secondary mb-4">
        Based on your browsing history
      </h6>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {recentlyViewedProducts.map((product) => {
          const discountedPrice = product.price - (product.price * product.discountPercentage / 100);

          return (
            <div
              key={product.id}
              className="col"
            >
              <div className="card product-card h-100 border-1 border-light-subtle rounded-5 position-relative bg-light">
                {product.discountPercentage >= 1 && (
                  <div className="d-flex flex-row discount-percentage rounded-5 bg-danger bg-opacity-25 py-1 px-2 position-absolute">
                    <i className="bi bi-tag-fill text-danger fs-7 me-2" />
                    <p className="text-danger urbanist fw-bold fs-7 mb-0">
                      -{Math.floor(product.discountPercentage)}%
                    </p>
                  </div>
                )}
                <img
                  style={{ height: 140 }}
                  src={product.thumbnail}
                  className="object-fit-contain bg-light"
                  alt={product.title}
                />
                <div className="d-flex flex-column card-body justify-content-between border-top border-1 border-light-subtle bg-white">
                  <div className="d-flex flex-wrap mb-2">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="badge rounded-pill bg-light text-body-emphasis text-capitalize inter fw-normal mb-2 me-2 border border-light-subtle"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="d-flex flex-column">
                    <h5 className="card-title text-body-emphasis text-truncate urbanist fs-6 fw-bold mb-0">
                      {product.title}
                    </h5>
                    <div className="d-flex mb-2">
                      {product.discountPercentage ? (
                        <>
                          <p className="card-title text-success urbanist fw-bold fs-6 mb-0 me-2">
                            ${discountedPrice.toFixed(2)}
                          </p>
                          <p className="card-title text-secondary text-decoration-line-through text-opacity-50 urbanist fw-medium fs-6 mb-0">
                            ${product.price}
                          </p>
                        </>
                      ) : (
                        <p className="card-title text-success urbanist fw-bold fs-6 mb-0">
                          ${product.price}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="d-flex">
                    <button
                      type="button"
                      className="btn btn-sm bg-info-subtle text-info-emphasis border-0 rounded-pill inter fw-medium flex-grow-1"
                      onClick={() => handleGoToProductPage(product.id)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentlyViewedItems;