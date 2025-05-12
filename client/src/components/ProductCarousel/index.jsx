import { useEffect, useRef, useState } from "react";
import Carousel from "bootstrap/js/dist/carousel";

const ProductCarousel = ({ product }) => {
  const [currentCarouselImage, setCurrentCarouselImage] = useState(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    let carouselInstance;

    if (product?.images?.length) {
      setCurrentCarouselImage(product.images[0]);
    }

    if (carouselRef.current && product?.images?.length > 0) {
      carouselInstance = new Carousel(carouselRef.current, {
        interval: false,
        ride: false,
        wrap: true
      });

      return () => {
        carouselInstance?.dispose();
      };
    }
  }, [product]);

  return (
    <div className="col-12 col-lg-6">
      <div
        ref={carouselRef}
        id="productCarousel"
        className="carousel slide carousel-dark bg-light rounded-3"
        data-bs-ride="carousel"
      >
        {product.images.length > 1 && (
          <div className="carousel-indicators">
            {product.images.map((_, i) => (
              <button
                key={i}
                type="button"
                data-bs-target="#productCarousel"
                data-bs-slide-to={i}
                className={currentCarouselImage === product.images[i] ? "active" : ""}
                aria-current={currentCarouselImage === product.images[i] ? "true" : undefined}
                aria-label={`Slide ${i + 1}`}
                onClick={() => setCurrentCarouselImage(product.images[i])}
              />
            ))}
          </div>
        )}
        <div className="carousel-inner">
          {product.images.map((img, i) => (
            <div
              key={i}
              className={`carousel-item ${currentCarouselImage === img ? "active" : ""}`}
            >
              <img
                src={img}
                className="d-block w-100 object-fit-contain"
                style={{ maxHeight: 460 }}
                alt={`Product Image ${i + 1}`}
              />
            </div>
          ))}
        </div>
        {product.images.length > 1 && (
          <>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#productCarousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#productCarousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCarousel;