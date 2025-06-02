import { motion } from "motion/react";
import "@/styles/PageTransitionAnimation.styles.css";

const PageTransitionAnimation = ({ children }) => {
  const slideInTransition = {
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
      ease: [0.87, 0, 0.13, 1]
    }
  };

  const slideOutTransition = {
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
      ease: [0.87, 0, 0.13, 1]
    }
  };

  const perspectiveTransition = {
    initial: {
      y: 0,
      scale: 1,
      opacity: 1
    },
    animate: {
      y: 0,
      scale: 1,
      opacity: 1
    },
    exit: {
      y: -100,
      scale: 0.9,
      opacity: 0
    },
    transition: {
      duration: 1.2,
      ease: [0.87, 0, 0.13, 1]
    }
  };

  return (
    <>
      <motion.div
        {...perspectiveTransition}
      >
        {children}
      </motion.div>
      <motion.div
        className="slide-in bg-light"
        key="slide-in"
        {...slideInTransition}
      />
      <motion.div
        className="slide-out bg-light"
        key="slide-out"
        {...slideOutTransition}
      />
    </>
  );
};

export default PageTransitionAnimation;