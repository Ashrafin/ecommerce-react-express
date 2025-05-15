const CartCanvas = () => {
  return (
    <div className="offcanvas offcanvas-end" data-bs-scroll="true" tabIndex="-1" id="cartCanvas" aria-labelledby="cartCanvasLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="cartCanvasLabel">Cart</h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        Your cart is empty.
      </div>
    </div>
  );
};

export default CartCanvas;