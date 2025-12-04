import {
  useEffect,
  useRef
} from "react";
import { createPortal } from "react-dom";
import {
  motion,
  AnimatePresence
} from "motion/react";
import { easings } from "@/animations/easings";
import "@/styles/Offcanvas.styles.css";

const Offcanvas = ({
  title,
  position = "end",
  className = "",
  children,
  isCartOpen,
  handleCloseCart
}) => {
  const backdropRef = useRef(null);

  useEffect(() => {
    const handleEscapeKeyPress = (e) => {
      if (isCartOpen && e.key === "Escape") {
        handleCloseCart();
      }
    };
    window.addEventListener("keydown", handleEscapeKeyPress);
    return () => window.removeEventListener("keydown", handleEscapeKeyPress);
  }, [
    isCartOpen,
    handleCloseCart
  ]);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) {
      handleCloseCart();
    }
  };

  const slideVariants = {
    initial: {
      x: position === "end" ? "100%" : "-100%",
      opacity: 0
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.25, ease: easings.easeInOutQuad }
    },
    exit: {
      x: position === "end" ? "100%" : "-100%",
      opacity: 0,
      transition: { duration: 0.25, ease: easings.easeInOutQuad }
    }
  };

  const backdropVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return createPortal(
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            ref={backdropRef}
            className="offcanvas-backdrop-custom"
            onClick={handleBackdropClick}
            variants={backdropVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          />
          <motion.div
            className={`offcanvas-panel-custom offcanvas-${position}-custom ${className}`}
            role="dialog"
            aria-modal="true"
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="offcanvas-header-custom border-1 border-bottom border-light-subtle">
              <h5 className="offcanvas-title-custom urbanist fw-semibold">{title}</h5>
              <i
                className="bi bi-x text-dark fs-4 pointer"
                onClick={handleCloseCart}
              />
            </div>
            <div className="offcanvas-body-custom">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Offcanvas;
