import { easings } from "../easings";

export const cartContainerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

export const cartItemVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easings.easeOutQuad
    }
  },
  exit: {
    opacity: 0,
    y: 50,
    transition: {
      duration: 0.3,
      ease: easings.easeInQuad
    }
  }
};
