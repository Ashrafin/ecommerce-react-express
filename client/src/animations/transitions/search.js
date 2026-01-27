import { easings } from "../easings";

export const fadeSlideUpSearch = {
  initial: {
    opacity: 0,
    y: 50
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easings.easeInQuad
    }
  },
  exit: {
    opacity: 0,
    y: 50,
    transition: {
      duration: 0.6,
      ease: easings.easeOutQuad
    }
  }
};