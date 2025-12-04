const ReviewsTab = ({ reviews }) => {
  return (
    <div className="d-flex flex-column">
      {reviews.map((review, i) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        const formattedDate = new Date(review.date).toLocaleDateString("en-us", options);

        return (
          <div key={i} className="col-12 p-3 border border-1 border-light-subtle rounded-4 mb-3">
            <div className="d-flex flex-row justify-content-between align-items-center mb-4">
              <div className="d-flex flex-row align-items-center">
                <div
                  style={{ height: 40, width: 40 }}
                  className="d-flex rounded-circle bg-body-tertiary justify-content-center align-items-center me-2"
                >
                  <i className="bi bi-person-fill text-secondary fs-3" />
                </div>
                <div className="flex-column">
                  <p className="fs-7 fw-semibold urbanist text-body-emphasis mb-0">
                    {review.reviewerName}
                  </p>
                  <p style={{ fontSize: "0.8rem" }} className="fw-medium urbanist text-body-tertiary mb-0">
                    {formattedDate}
                  </p>
                </div>
              </div>
              <div className="d-flex flex-row align-items-center">
                <i className="bi bi-star-fill text-warning fs-7" />
                <p className="fs-7 fw-normal inter text-body-tertiary ms-1 mb-0">
                  {review.rating.toFixed(1)}
                </p>
              </div>
            </div>
            <p className="fs-7 lh-1 fw-normal inter text-body-emphasis mb-0">
              {review.comment}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewsTab;