import { useEffect } from "react";
import Tooltip from "bootstrap/js/dist/tooltip";

const StarRatings = ({ rating, reviewCount, starSize }) => {
  const filledStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - filledStars - (halfStar ? 1 : 0);

  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="ratings tooltip"]');
    const tooltipInstance = [...tooltipTriggerList].map((tooltipTriggerEl) => new Tooltip(tooltipTriggerEl));

    return () => {
      tooltipInstance?.dispose();
    }
  }, []);

  return (
    <div className="d-flex align-items-center">
      <div className="d-flex" data-bs-toggle="ratings tooltip" data-bs-placement="right" data-bs-title={`${rating} out of 5`}>
        {[...Array(filledStars)].map((_, i) => (
          <i
            key={`full-${i}`}
            className={`bi bi-star-fill text-warning ${starSize === "sm" ? "fs-7" : ""} ${starSize === "lg" ? "fs-6" : ""}`}
          />
        ))}
        {halfStar && (
          <i className={`bi bi-star-half text-warning ${starSize === "sm" ? "fs-7" : ""} ${starSize === "lg" ? "fs-6" : ""}`} />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <i
            key={`empty-${i}`}
            className={`bi bi-star text-warning ${starSize === "sm" ? "fs-7" : ""} ${starSize === "lg" ? "fs-6" : ""}`}
          />
        ))}
      </div>
      <p className={`text-secondary fw-normal ${starSize === "sm" ? "fs-7" : ""} ${starSize === "lg" ? "fs-6" : ""} ms-1 my-0`}>
        {reviewCount} Reviews
      </p>
    </div>
  );
};

export default StarRatings;