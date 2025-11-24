import { motion } from "motion/react";
import { easings } from "./easings";
import "@/styles/PageTransitionAnimation.styles.css";

const PageTransitionAnimation = ({ children }) => {
  const slideInTopTransition = {
    initial: {
      scaleY: 0
    },
    animate: {
      scaleY: 0
    },
    exit: {
      scaleY: 1
    },
    transition: {
      duration: 1,
      ease: easings.easeInOutQuad
    }
  };

  const slideOutBottomTransition = {
    initial: {
      scaleY: 1
    },
    animate: {
      scaleY: 0
    },
    exit: {
      scaleY: 0
    },
    transition: {
      duration: 1,
      ease: easings.easeInOutQuad
    }
  };

  const overlayTransition = {
    initial: {
      opacity: 0.2
    },
    animate: {
      opacity: 0
    },
    exit: {
      opacity: 0.2,
      zIndex: 1021,
      transition: {
        duration: 1,
        ease: easings.easeOutQuad
      }
    }
  };

  return (
    <>
      <motion.div
        style={{ position: "fixed", top: 0, left: 0, height: "100vh", width: "100%", backgroundColor: "#000" }}
        {...overlayTransition}
      />
      <div className="z-1 position-relative">
        {children}
      </div>
      <motion.div
        className="slide-in bg-light"
        key="slide-in"
        {...slideInTopTransition}
      />
      <motion.div
        className="slide-out bg-light"
        key="slide-out"
        {...slideOutBottomTransition}
      />
    </>
  );
};

export default PageTransitionAnimation;