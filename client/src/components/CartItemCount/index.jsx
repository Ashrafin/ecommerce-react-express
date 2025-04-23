const CartItemCount = ({ count }) => {
  const cartCount = () => {
    if (!count || count === 0) return;

    return count > 9 ? "9+" : count;
  };

  return (
    <div
      className="position-relative btn-cart text-light ms-3"
      data-bs-toggle="offcanvas"
      data-bs-target="#cartCanvas"
      aria-controls="cartCanvas"
    >
      <span
        style={{ top: 5 }}
        className="position-absolute start-100 translate-middle badge rounded-pill bg-secondary text-light fw-normal"
      >
        {cartCount()}
      </span>
      <i className="bi bi-cart2 fs-4 text-light" />
    </div>
  );
};

export default CartItemCount;