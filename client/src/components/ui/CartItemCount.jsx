import {
  motion,
  AnimatePresence
} from "motion/react";
import { easings } from "@/animations/easings";
import "@/styles/CartItemCount.styles.css";

const CartItemCount = ({
  count,
  handleOpenCart
}) => {
  const cartCount = () => {
    if (!count || count === 0) return;

    return count > 9 ? "9+" : count;
  };

  return (
    <div
      className="position-relative btn-cart-item text-light ms-3"
      onClick={handleOpenCart}
    >
      <AnimatePresence mode="popLayout">
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              duration: 0.25,
              ease: easings.easeInOutQuad
            }}
            className="position-absolute start-100 translate-middle badge rounded-pill bg-danger inter text-light fw-semibold t-5"
          >
            {cartCount()}
          </motion.span>
        )}
      </AnimatePresence>
      <i className="bi bi-bag-fill fs-5 text-info-emphasis" />
    </div>
  );
};

export default CartItemCount;