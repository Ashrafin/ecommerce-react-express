import { useNavigate } from "react-router-dom";

const CartPreview = ({ cartItems }) => {
  const navigate = useNavigate();
  const itemsToShow = cartItems.slice(0, 3);
  const itemCount = cartItems.length > 3 ? "3 or more" : cartItems.length;

  const handleGoToCartPage = () => {
    navigate("/cart");
  };

  return (
    <div className="d-flex flex-column mt-5">
      <h4 className="fs-4 fw-bold urbanist text-body-emphasis mb-1">
        Items in Cart
      </h4>
      <h6 className="inter fs-7 fw-normal text-body-secondary mb-4">
        {itemCount === 1 ? "There is 1 item in your cart" : `There are ${itemCount} items in your cart`}
      </h6>
      <div className="d-flex flex-column">
        {itemsToShow.map((item) => {
          const hasDiscount = item.discountPercentage && item.discountPercentage > 0;
          const finalPrice = hasDiscount
            ? item.price * (1 - item.discountPercentage / 100)
            : item.price;

          return (
            <div
              key={item.id}
              className="d-flex flex-column flex-md-row py-4 border-bottom border-light-subtle"
            >
              <img
                style={{ height: 160, objectFit: "contain" }}
                className="rounded-4 bg-light border border-light-subtle mb-3 mb-md-0"
                src={item.thumbnail}
                alt={item.title}
              />
              <div className="ms-0 ms-md-4 w-100">
                <h3 className="urbanist fs-4 fw-bold text-body-emphasis mb-1">
                  {item.title}
                </h3>
                <div className="d-flex align-items-center mb-0">
                  {item.discountPercentage > 0 ? (
                    <>
                      <p className="urbanist fs-5 fw-bold text-success mb-0 me-2">
                        ${(finalPrice * item.quantity).toFixed(2)}
                      </p>
                      <p className="urbanist fs-5 fw-medium text-secondary text-decoration-line-through text-opacity-50 mb-0">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </>
                  ) : (
                    <p className="urbanist fs-5 fw-bold text-success mb-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  )}
                </div>
                {item.stock > 0 ? (
                  <p className="inter fs-8 fw-medium text-success mb-2">
                    In Stock
                  </p>
                ) : (
                  <p className="inter fs-8 fw-medium text-danger mb-2">
                    Out of Stock
                  </p>
                )}
                <p className="urbanist fs-6 fw-semibold text-body-tertiary mb-0">
                  Qty:
                  <span className="fw-semibold text-body ms-1">
                    {item.quantity}
                  </span>
                </p>
              </div>
            </div>
          );
        })}
        <div className="d-flex justify-content-end mt-4">
          <button
            className="btn btn-sm bg-info-subtle text-info-emphasis border-0 rounded-pill px-4 py-2 inter fw-medium"
            onClick={handleGoToCartPage}
          >
            View Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPreview;
