const DetailsTab = ({
  weight,
  warrantyInformation,
  dimensions
}) => {
  return (
    <div className="row d-flex flex-wrap g-3">
      <div className="col-6">
        <div className="d-flex flex-column border border-1 border-light-subtle p-3 rounded-4 h-100">
          <div className="d-flex align-items-center mb-2">
            <i className="bi bi-box-seam-fill fs-6 text-body-emphasis" />
            <p className="fs-6 fw-semibold urbanist text-body-emphasis ms-2 mb-0">
              Weight
            </p>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-1">
            <p className="fs-7 fw-medium inter text-body-secondary m-0">
              Weight
            </p>
            <p className="fs-7 fw-medium inter text-body-secondary m-0">
              {weight} lbs
            </p>
          </div>
        </div>
      </div>
      <div className="col-6">
        <div className="d-flex flex-column border border-1 border-light-subtle p-3 rounded-4 h-100">
          <div className="d-flex align-items-center mb-2">
            <i className="bi bi-shield-fill-check fs-6 text-body-emphasis" />
            <p className="fs-6 fw-semibold urbanist text-body-emphasis ms-2 mb-0">
              Warranty Information
            </p>
          </div>
          <p className="fs-7 fw-medium inter text-body-secondary mb-0 mt-1">
            {warrantyInformation}
          </p>
        </div>
      </div>
      <div className="col-6">
        <div className="d-flex flex-column border border-1 border-light-subtle p-3 rounded-4 h-100">
          <div className="d-flex align-items-center mb-2">
            <i className="bi bi-aspect-ratio-fill fs-6 text-body-emphasis" />
            <p className="fs-6 fw-semibold urbanist text-body-emphasis ms-2 mb-0">
              Size
            </p>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-1">
            <p className="fs-7 fw-medium inter text-body-secondary m-0">
              Height
            </p>
            <p className="fs-7 fw-medium inter text-body-secondary m-0">
              {dimensions.height} cm
            </p>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-1">
            <p className="fs-7 fw-medium inter text-body-secondary m-0">
              Width
            </p>
            <p className="fs-7 fw-medium inter text-body-secondary m-0">
              {dimensions.width} cm
            </p>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-1">
            <p className="fs-7 fw-medium inter text-body-secondary m-0">
              Depth
            </p>
            <p className="fs-7 fw-medium inter text-body-secondary m-0">
              {dimensions.depth} cm
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsTab;