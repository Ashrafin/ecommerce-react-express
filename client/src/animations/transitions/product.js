import { easings } from "../easings";

const fadeInOutProduct = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 1,
      delay: 0.6,
      ease: easings.easeInQuad
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: easings.easeOutQuad
    }
  }
};

const fadeSlideUpProduct = {
  initial: {
    opacity: 0,
    y: 50
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easings.easeInQuad
    }
  },
  exit: {
    opacity: 0,
    y: 50,
    transition: {
      duration: 0.8,
      ease: easings.easeOutQuad
    }
  }
};

export {
  fadeInOutProduct,
  fadeSlideUpProduct
};