import { useCartStore } from "@/store/useCartStore";

const CartCanvas = () => {
  const items = useCartStore(store => store.items);

  return (
    <div className="offcanvas offcanvas-end" data-bs-scroll="true" tabIndex="-1" id="cartCanvas" aria-labelledby="cartCanvasLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="cartCanvasLabel">Cart</h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        {items.length < 1 && "Your cart is empty."}
        {items.length > 0 && (
          <>
            {items.map(item => <h5 key={item.id}>{item.title}</h5>)}
          </>
        )}
      </div>
    </div>
  );
};

export default CartCanvas;