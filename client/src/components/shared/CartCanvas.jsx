import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/store/useCartStore";
import {
  motion,
  AnimatePresence
} from "motion/react";
import CartCanvasItem from "@/components/ui/CartCanvasItem";
import Offcanvas from "./Offcanvas";
import { easings } from "@/animations/easings";

const CartCanvas = ({
  isCartOpen,
  handleCloseCart
}) => {
  const items = useCartStore(store => store.items);
  const totalPrice = useCartStore(store => store.totalPrice());
  const navigate = useNavigate();

  const handleGoToCart = () => {
    handleCloseCart();
    navigate("/cart");
  };

  const containerVariants = {
    hidden: {
      opacity: 1
    },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: {
      x: 50,
      opacity: 0
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.25,
        ease: easings.easeInOutQuad
      }
    },
    exit: {
      x: 50,
      opacity: 0,
      transition: {
        duration: 0.25,
        ease: easings.easeInOutQuad
      }
    }
  };

  return (
    <Offcanvas
      title="Shopping Cart"
      position="end"
      isCartOpen={isCartOpen}
      handleCloseCart={handleCloseCart}
    >
      <motion.div
        className="d-flex flex-column position-relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {items.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inter fw-medium"
          >
            Your cart is empty.
          </motion.p>
        )}

        {items.length > 0 && (
          <motion.h6
            variants={itemVariants}
            className="inter fw-medium"
          >
            Subtotal: <span className="text-success urbanist fw-semibold">${totalPrice.toFixed(2)}</span>
          </motion.h6>
        )}

        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              layout
            >
              <CartCanvasItem
                item={item}
                handleCloseCart={handleCloseCart}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {items.length > 0 && (
          <motion.button
            variants={itemVariants}
            className="btn btn-sm bg-info-subtle text-info-emphasis inter fw-semibold mt-3 py-2 border-0 rounded-pill"
            onClick={handleGoToCart}
          >
            Go to Cart
          </motion.button>
        )}
      </motion.div>
    </Offcanvas>
  );
};

export default CartCanvas;