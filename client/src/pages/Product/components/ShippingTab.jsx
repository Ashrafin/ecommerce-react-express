const ShippingTab = ({
  returnPolicy,
  shippingInfo
}) => {
  return (
    <div className="row d-flex flex-wrap g-3">
      <div className="col-6">
        <div className="d-flex flex-column border border-1 border-light-subtle p-3 rounded-4 h-100">
          <div className="d-flex align-items-center mb-2">
            <i className="bi bi-reply-fill fs-6 text-body-emphasis" />
            <p className="fs-6 fw-semibold urbanist text-body-emphasis ms-2 mb-0">
              Return Policy
            </p>
          </div>
          <p className="fs-7 fw-medium inter text-body-secondary mb-0 mt-1">
            {returnPolicy}
          </p>
        </div>
      </div>
      <div className="col-6">
        <div className="d-flex flex-column border border-1 border-light-subtle p-3 rounded-4 h-100">
          <div className="d-flex align-items-center mb-2">
            <i className="bi bi-truck-front-fill fs-6 text-body-emphasis" />
            <p className="fs-6 fw-semibold urbanist text-body-emphasis ms-2 mb-0">
              Shipping Time
            </p>
          </div>
          <p className="fs-7 fw-medium inter text-body-secondary mb-0 mt-1">
            {shippingInfo}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingTab;