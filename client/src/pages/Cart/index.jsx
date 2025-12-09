import {
  useEffect,
  useRef
} from "react";
import { useCartStore } from "@/store/useCartStore";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import Container from "@/components/ui/Container";
import CartItem from "./components/CartItem";
import {
  staggeredContainerVariants,
  staggeredItemVariants
} from "@/animations/transitions/staggered";
import "@/styles/CartPage.styles.css";

const CartPage = () => {
  const navigate = useNavigate();
  const cartItems = useCartStore(state => state.items);
  const totalItems = useCartStore(state => state.totalItems());
  const totalPrice = useCartStore(state => state.totalPrice());
  const isMounting = useRef(true);

  useEffect(() => {
    if (isMounting.current) {
      if (cartItems.length === 0) {
        navigate("/", { replace: true });
      }
      isMounting.current = false;
    }
  }, [
    cartItems,
    navigate
  ]);

  if (
    cartItems.length === 0 &&
    !isMounting.current
  ) {
    return (
      <Container utilityClasses="py-5 px-3 px-md-4">
        <motion.div
          variants={staggeredContainerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="d-flex flex-column align-items-center justify-content-center py-5"
        >
          <motion.i
            variants={staggeredItemVariants}
            className="bi bi-cart-x fs-1 text-body-tertiary mb-3"
          />
          <motion.h2
            variants={staggeredItemVariants}
            className="urbanist fs-4 fw-bold text-body-emphasis mb-1"
          >
            Your Cart is Empty
          </motion.h2>
          <motion.p
            variants={staggeredItemVariants}
            className="inter fs-6 fw-normal text-body-secondary mb-4"
          >
            Looks like you haven't added anything to your cart yet.
          </motion.p>
          <motion.button
            variants={staggeredItemVariants}
            className="btn btn-sm bg-info-subtle text-info-emphasis border-0 rounded-pill px-4 py-2 inter fw-medium"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </motion.button>
        </motion.div>
      </Container>
    );
  }

  return (
    <Container utilityClasses="py-5 px-3 px-md-4">
      <motion.div
        variants={staggeredContainerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.h2
          variants={staggeredItemVariants}
          className="fw-bold fs-3 urbanist text-body-emphasis mb-4"
        >
          Shopping Cart
        </motion.h2>
        <div className="d-flex flex-column">
          {cartItems.map(item => (
            <motion.div
              key={item.id}
              variants={staggeredItemVariants}
            >
              <CartItem
                item={item}
              />
            </motion.div>
          ))}
        </div>
        <motion.div
          variants={staggeredItemVariants}
          className="d-flex flex-column mt-4"
        >
          <p className="mb-4">
            <span className="inter fs-6 fw-medium text-body-emphasis">Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"}):</span>
            <span className="urbanist fs-5 fw-bold text-success ms-2">${totalPrice?.toFixed(2)}</span>
          </p>
          <button
            className="btn btn-sm bg-info-subtle text-info-emphasis border-0 rounded-pill px-4 py-2 inter fw-medium w-fit-content"
            onClick={() => console.log("Proceed to checkout page")}
          >
            Proceed to checkout
          </button>
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default CartPage;