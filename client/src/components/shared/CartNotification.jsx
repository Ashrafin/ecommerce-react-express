import { useCartStore } from "@/store/useCartStore";
import {
  motion,
  AnimatePresence
} from "motion/react";
import { easings } from "@/animations/easings";
import "@/styles/CartNotification.styles.css";

const CartNotification = () => {
  const showNotification = useCartStore(state => state.showNotification);
  const message = useCartStore(state => state.notificationMessage);
  const notificationId = useCartStore(state => state.notificationId);
  const closeNotification = useCartStore(state => state.hideNotification);
  const processQueue = useCartStore(state => state.processQueue);

  const variants = {
    initial: { y: -50, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: easings.easeOutBack
      }
    },
    exit: {
      y: -50,
      opacity: 0,
      transition: {
        duration: 1,
        ease: easings.easeInOutQuad
      }
    }
  };

  return (
    <div className="toast-container cart-notification-container p-3">
      <AnimatePresence onExitComplete={processQueue}>
        {showNotification && (
          <motion.div
            key={notificationId}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="toast show rounded-4 overflow-hidden shadow"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="d-flex align-items-center toast-header bg-light border-bottom-0 bg-opacity-75">
              <h6 className="urbanist fw-semibold fs-6 mb-0 me-auto text-black">
                Notification
              </h6>
              <i
                className="bi bi-x-circle-fill fs-5 text-body-tertiary pointer"
                onClick={closeNotification}
                aria-label="Close"
              />
            </div>
            <div style={{ height: 2 }} className="progress rounded-0">
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{
                  duration: 5,
                  ease: "linear"
                }}
                className="progress-bar bg-warning"
                role="progressbar"
              />
            </div>
            <div className="toast-body bg-light bg-opacity-75">
              <p className="inter fw-medium fs-7 text-body-secondary mb-0">
                {message}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CartNotification;