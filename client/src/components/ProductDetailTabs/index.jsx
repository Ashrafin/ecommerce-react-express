import { useEffect } from "react";
import Tab from "bootstrap/js/dist/tab";

const ProductDetailTabs = ({
  weight,
  warrantyInformation,
  dimensions,
  returnPolicy,
  shippingInformation
}) => {
  useEffect(() => {
    const tabTriggerList = document.querySelectorAll("#details-tab .nav-link");
    const tabInstances = [...tabTriggerList].map((tabTriggerEl) => new Tab(tabTriggerEl));
    
    return () => {
      tabInstances.forEach((instance) => instance.dispose());
    };
  }, []);

  return (
    <>
      <div className="d-flex rounded-5 bg-body-tertiary w-fit-content p-2 mb-4">
        <ul className="nav nav-pills flex-column flex-sm-row m-0" id="details-tab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active rounded-5"
              id="product-detail-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-product-details"
              type="button"
              role="tab"
              aria-controls="pills-product-details"
              aria-selected="true"
            >
              Product Details
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link rounded-5"
              id="shipping-information-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-shipping-information"
              type="button"
              role="tab"
              aria-controls="pills-shipping-information"
              aria-selected="false"
            >
              Shipping Information
            </button>
          </li>
        </ul>
      </div>
      <div className="tab-content" id="details-tabContent">
        <div
          className="tab-pane fade show active"
          id="pills-product-details"
          role="tabpanel"
          aria-labelledby="product-detail-tab"
          tabIndex="0"
        >
          <div className="row d-flex flex-wrap g-3">
            <div className="col-6">
              <div className="d-flex flex-column border border-2 border-light-subtle p-3 rounded-3 h-100">
                <div className="d-flex align-items-center mb-2">
                  <i className="bi bi-box-seam-fill fs-6 text-dark-emphasis"></i>
                  <p className="fs-6 fw-bold text-dark-emphasis ms-2 mb-0">Weight</p>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-1">
                  <p className="fs-7 fw-normal text-body-secondary m-0">Weight</p>
                  <p className="fs-7 fw-normal text-body-secondary m-0">{weight} lbs</p>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex flex-column border border-2 border-light-subtle p-3 rounded-3 h-100">
                <div className="d-flex align-items-center mb-2">
                  <i className="bi bi-shield-fill-check fs-6 text-dark-emphasis"></i>
                  <p className="fs-6 fw-semibold text-dark-emphasis ms-2 mb-0">Warranty Information</p>
                </div>
                <p className="fs-7 fw-normal text-body-secondary mb-0 mt-1">{warrantyInformation}</p>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex flex-column border border-2 border-light-subtle p-3 rounded-3 h-100">
                <div className="d-flex align-items-center mb-2">
                  <i className="bi bi-aspect-ratio-fill fs-6 text-dark-emphasis"></i>
                  <p className="fs-6 fw-semibold text-dark-emphasis ms-2 mb-0">Size</p>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-1">
                  <p className="fs-7 fw-normal text-body-secondary m-0">Height</p>
                  <p className="fs-7 fw-normal text-body-secondary m-0">{dimensions.height} cm</p>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-1">
                  <p className="fs-7 fw-normal text-body-secondary m-0">Width</p>
                  <p className="fs-7 fw-normal text-body-secondary m-0">{dimensions.width} cm</p>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-1">
                  <p className="fs-7 fw-normal text-body-secondary m-0">Depth</p>
                  <p className="fs-7 fw-normal text-body-secondary m-0">{dimensions.depth} cm</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="pills-shipping-information"
          role="tabpanel"
          aria-labelledby="shipping-information-tab"
          tabIndex="0"
        >
          <div className="row d-flex flex-wrap g-3">
            <div className="col-6">
              <div className="d-flex flex-column border border-2 border-light-subtle p-3 rounded-3 h-100">
                <div className="d-flex align-items-center mb-2">
                  <i className="bi bi-reply-fill fs-6 text-dark-emphasis"></i>
                  <p className="fs-6 fw-bold text-dark-emphasis ms-2 mb-0">Return Policy</p>
                </div>
                <p className="fs-7 fw-normal text-body-secondary mb-0 mt-1">{returnPolicy}</p>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex flex-column border border-2 border-light-subtle p-3 rounded-3 h-100">
                <div className="d-flex align-items-center mb-2">
                  <i className="bi bi-truck-front-fill fs-6 text-dark-emphasis"></i>
                  <p className="fs-6 fw-bold text-dark-emphasis ms-2 mb-0">Shipping Time</p>
                </div>
                <p className="fs-7 fw-normal text-body-secondary mb-0 mt-1">{shippingInformation}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailTabs;