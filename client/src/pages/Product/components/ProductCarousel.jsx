import { useEffect, useRef } from "react";
import Carousel from "bootstrap/js/dist/carousel";

const ProductCarousel = ({ images }) => {
  const carouselRef = useRef(null);

  useEffect(() => {
    let carouselInstance;

    if (carouselRef.current && images?.length > 0) {
      carouselInstance = new Carousel(carouselRef.current, {
        interval: false,
        ride: false,
        wrap: true
      });

      return () => {
        carouselInstance.dispose();
      };
    }
  }, [images]);

  return (
    <div className="col-12 col-lg-6">
      <div
        ref={carouselRef}
        id="productCarousel"
        className="carousel slide carousel-dark bg-light rounded-5"
        data-bs-ride="carousel"
      >
        {images.length > 1 && (
          <div className="carousel-indicators">
            {images.map((_, i) => (
              <button
                style={{ height: 8, width: 8 }}
                key={i}
                type="button"
                data-bs-target="#productCarousel"
                data-bs-slide-to={i}
                className={`rounded-circle bg-secondary ${i === 0 ? "active" : ""}`}
                aria-current={i === 0 ? "true" : undefined}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        )}
        <div className="carousel-inner">
          {images.map((img, i) => (
            <div
              key={i}
              className={`carousel-item ${i === 0 ? "active" : ""}`}
            >
              <img
                src={img}
                className="d-block w-100 object-fit-contain p-5"
                style={{ maxHeight: 460 }}
                alt={`Product Image ${i + 1}`}
              />
            </div>
          ))}
        </div>
        {images.length > 1 && (
          <>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#productCarousel"
              data-bs-slide="prev"
            >
              <i className="bi bi-arrow-left-circle-fill fs-4 text-secondary" aria-hidden="true"></i>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#productCarousel"
              data-bs-slide="next"
            >
              <i className="bi bi-arrow-right-circle-fill fs-4 text-secondary" aria-hidden="true"></i>
              <span className="visually-hidden">Next</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCarousel;