import { useEffect } from "react";
import Tooltip from "bootstrap/js/dist/tooltip";

const StarRatings = ({
  rating,
  reviewCount,
  starSize
}) => {
  const filledStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - filledStars - (halfStar ? 1 : 0);

  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="ratings tooltip"]');
    const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new Tooltip(tooltipTriggerEl));

    return () => {
      tooltipList.forEach((tooltip) => tooltip.dispose());
    };
  }, []);

  const starSizeClass = starSize === "sm" ? "fs-8" : starSize === "lg" ? "fs-7" : "";

  return (
    <div className="d-flex align-items-center">
      <div
        className="d-flex"
        data-bs-toggle="ratings tooltip"
        data-bs-placement="right"
        data-bs-title={`${rating} out of 5`}
      >
        {[...Array(filledStars)].map((_, i) => (
          <i
            key={`full-${i}`}
            className={`bi bi-star-fill text-warning ${starSizeClass}`}
          />
        ))}
        {halfStar && (
          <i className={`bi bi-star-half text-warning ${starSizeClass}`} />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <i
            key={`empty-${i}`}
            className={`bi bi-star text-warning ${starSizeClass}`}
          />
        ))}
      </div>
      <p className={`text-body-tertiary inter fw-medium ${starSizeClass} ms-1 my-0`}>
        {reviewCount} Reviews
      </p>
    </div>
  );
};

export default StarRatings;