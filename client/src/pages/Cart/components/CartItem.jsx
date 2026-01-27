import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/store/useCartStore";
import {
  motion,
  AnimatePresence
} from "motion/react";
import { easings } from "@/animations/easings";

const CartItem = ({ item }) => {
  const navigate = useNavigate();
  const prevQuantityRef = useRef(item.quantity);
  const direction = item.quantity > prevQuantityRef.current ? 1 : -1;
  const hasDiscount = item.discount && item.discount > 0;
  const finalPrice = hasDiscount
    ? item.price * (1 - item.discount / 100)
    : item.price;

  const handleUpdateQuantity = useCartStore(store => store.updateQuantity);
  const handleRemoveItem = useCartStore(store => store.removeItem);

  const handleNavigateToProduct = () => {
    navigate(`/product/${item.id}`);
  };

  const variants = {
    enter: (direction) => ({
      y: direction > 0 ? 10 : -10,
      opacity: 0
    }),
    center: {
      y: 0,
      opacity: 1
    },
    exit: (direction) => ({
      y: direction > 0 ? -10 : 10,
      opacity: 0
    })
  };

  return (
    <div className="d-flex flex-column flex-md-row py-4 border-bottom border-light-subtle">
      <img
        className="cart-item-img rounded-4 bg-light border border-light-subtle mb-3 mb-md-0 pointer"
        src={item.thumbnail}
        alt={item.title}
        onClick={handleNavigateToProduct}
      />
      <div className="ms-0 ms-md-4 w-100">
        <h3
          className="urbanist fs-5 fw-bold text-body-emphasis mt-2 mb-2 pointer"
          onClick={handleNavigateToProduct}
        >
          {item.title}
        </h3>
        <div className="d-flex align-items-center mb-3">
          {hasDiscount ? (
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
        <div className="d-inline-flex flex-row align-items-center border border-2 border-warning-subtle rounded-pill px-2 position-relative">
          {item.quantity === 1 && (
            <i
              className="bi bi-trash3 fs-6 text-dark-emphasis me-2 pointer"
              onClick={() => handleRemoveItem(item.productId)}
            />
          )}
          {item.quantity > 1 && (
            <i
              className="bi bi-dash fs-4 text-dark-emphasis pointer"
              onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
            />
          )}
          <div
            className="position-relative mx-2 d-flex justify-content-center align-items-center"
            style={{ width: '2rem', height: '1.5rem' }}
          >
            <AnimatePresence
              mode="popLayout"
              initial={false}
              custom={direction}
            >
              <motion.p
                key={item.quantity}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.25,
                  ease: easings.easeInOutQuad
                }}
                className="urbanist fs-6 fw-semibold text-dark mb-0 position-absolute"
              >
                {item.quantity}
              </motion.p>
            </AnimatePresence>
          </div>
          <i
            className="bi bi-plus fs-4 text-dark-emphasis pointer"
            onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;