import {
  useRef,
  useEffect
} from "react";
import { useCartStore } from "@/store/useCartStore";
import {
  useNavigate,
  useLocation
} from "react-router-dom";
import {
  motion,
  AnimatePresence
} from "motion/react";
import { easings } from "@/animations/easings";

const CartCanvasItem = ({
  item,
  handleCloseCart
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const prevQuantityRef = useRef(item.quantity);
  const direction = item.quantity > prevQuantityRef.current ? 1 : -1;

  useEffect(() => {
    prevQuantityRef.current = item.quantity;
  }, [item.quantity]);

  const hasDiscount = item.discountPercentage && item.discountPercentage > 0;
  const finalPrice = hasDiscount
    ? item.price * (1 - item.discountPercentage / 100)
    : item.price;
  const handleUpdateQuantity = useCartStore(store => store.updateQuantity);
  const handleRemoveItem = useCartStore(store => store.removeItem);

  const handleGoToProductPage = () => {
    if (location.pathname === `/product/${item.id}`) return;

    handleCloseCart();
    setTimeout(() => navigate(`/product/${item.id}`), 150);
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
    <div className="d-flex flex-row align-items-center my-2">
      <div className="bg-light border border-light-subtle rounded-4 me-2">
        <img
          style={{ height: 160, width: 160 }}
          className={`object-fit-contain ${location.pathname === `/product/${item.id}` ? "" : "pointer"}`}
          src={item.thumbnail}
          onClick={handleGoToProductPage}
        />
      </div>
      <div className="flex-column ms-2">
        <p className="urbanist fs-6 fw-semibold text-success">
          ${(finalPrice * item.quantity).toFixed(2)}
        </p>
        <div className="d-inline-flex flex-row align-items-center border border-2 border-warning-subtle rounded-pill px-2 position-relative">
          {item.quantity === 1 && (
            <i
              className="bi bi-trash3 fs-6 text-dark-emphasis me-2 pointer"
              onClick={() => handleRemoveItem(item.id)}
            />
          )}
          {item.quantity > 1 && (
            <i
              className="bi bi-dash fs-4 text-dark-emphasis pointer"
              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
            />
          )}
          <div className="position-relative mx-2 d-flex justify-content-center align-items-center" style={{ width: '2rem', height: '1.5rem' }}>
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
            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
          />
        </div>
      </div>
    </div>
  );
};

export default CartCanvasItem;