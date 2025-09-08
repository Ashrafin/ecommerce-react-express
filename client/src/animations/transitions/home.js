import { easings } from "../easings";

const fadeSlideUpHome = {
  initial: {
    opacity: 0,
    y: 50
  },
  animate: {
    opacity: 1,
    y: 0
  },
  exit: {
    opacity: 0,
    y: 50
  },
  transition: {
    duration: 1.3,
    ease: easings.easeInOutQuad
  }
};

export { fadeSlideUpHome };