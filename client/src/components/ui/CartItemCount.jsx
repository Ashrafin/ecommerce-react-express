import "@/styles/CartItemCount.styles.css";

const CartItemCount = ({ count }) => {
  const cartCount = () => {
    if (!count || count === 0) return;

    return count > 9 ? "9+" : count;
  };

  return (
    <div
      className="position-relative btn-cart-item text-light ms-3"
      data-bs-toggle="offcanvas"
      data-bs-target="#cartCanvas"
      aria-controls="cartCanvas"
    >
      <span
        className="position-absolute start-100 translate-middle badge rounded-pill bg-danger inter text-light fw-normal t-5 border border-1 border-light-subtle"
      >
        {cartCount()}
      </span>
      <i className="bi bi-bag-fill fs-5 text-info-emphasis" />
    </div>
  );
};

export default CartItemCount;