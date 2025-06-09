import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { easings } from "@/animations/easings";
import "@/styles/ProductCarousel.styles.css";

const ProductCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginateImage = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + images.length) % images.length);
  };

  const carouselVariants = {
    initial: (direction) => ({
      opacity: 0,
      x: direction > 0 ? "15%" : "-15%"
    }),
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: easings.easeInQuad
      }
    },
    exit: (direction) => ({
      opacity: 0,
      x: direction > 0 ? "-15%" : "15%",
      transition: {
        duration: 0.3,
        ease: easings.easeOutQuad
      }
    })
  };

  const fadeSlideRightTransition = {
    initial: {
      opacity: 0,
      x: -50
    },
    animate: {
      opacity: 1,
      x: 0
    },
    exit: {
      opacity: 0,
      x: -50
    },
    transition: {
      duration: 1,
      ease: easings.easeInOutQuad
    }
  };

  return (
    <div className="col-12 col-lg-6">
      <motion.div
        {...fadeSlideRightTransition}
        className="product-carousel-container position-relative overflow-hidden rounded-5 bg-light w-100"
      >
        <AnimatePresence mode="wait" custom={direction} initial="false">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            custom={direction}
            variants={carouselVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="product-carousel-img w-100 h-100 object-fit-contain"
          />
        </AnimatePresence>

        {images.length > 1 && (
          <div className="d-flex justify-content-between position-absolute top-50 translate-middle-y start-0 end-0 px-3">
            <motion.button
              className="product-carousel-prev-btn btn bg-transparent border-0 text-body-tertiary"
              onClick={() => paginateImage(-1)}
              whileHover={{
                opacity: 1,
                transition: {
                  duration: 0.2,
                  ease: easings.easeInOutSine
                }
              }}
              style={{ opacity: 0.5 }}
            >
              <i className="bi bi-arrow-left-circle-fill fs-4" />
            </motion.button>
            <motion.button
              className="product-carousel-next-btn btn bg-transparent border-0 text-body-tertiary"
              onClick={() => paginateImage(1)}
              whileHover={{
                opacity: 1,
                transition: {
                  duration: 0.2,
                  ease: easings.easeInOutSine
                }
              }}
              style={{ opacity: 0.5 }}
            >
              <i className="bi bi-arrow-right-circle-fill fs-4" />
            </motion.button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ProductCarousel;