import { useEffect } from "react";
import Tab from "bootstrap/js/dist/tab";
import ReviewsTab from "./ReviewsTab";
import ShippingTab from "./ShippingTab";
import DetailsTab from "./DetailsTab";
import "@/styles/ProductTabs.styles.css";

const ProductTabs = ({
  weight,
  warrantyInformation,
  dimensions,
  returnPolicy,
  shippingInformation,
  reviews
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
      <div className="d-flex product-tabs rounded-5 bg-light w-100 overflow-x-scroll p-2 mb-4">
        <ul className="nav nav-pills m-0" id="details-tab" role="tablist">
          <li className="nav-item flex-fill" role="presentation">
            <button
              className="nav-link text-info-emphasis urbanist fw-semibold rounded-pill w-100 active"
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
          <li className="nav-item flex-fill" role="presentation">
            <button
              className="nav-link text-info-emphasis urbanist fw-semibold rounded-pill w-100"
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
          <li className="nav-item flex-fill" role="presentation">
            <button
              className="nav-link text-info-emphasis urbanist fw-semibold rounded-pill w-100"
              id="reviews-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-reviews"
              type="button"
              role="tab"
              aria-controls="pills-reviews"
              aria-selected="false"
            >
              Reviews & Ratings
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
          <DetailsTab weight={weight} warrantyInformation={warrantyInformation} dimensions={dimensions} />
        </div>
        <div
          className="tab-pane fade"
          id="pills-shipping-information"
          role="tabpanel"
          aria-labelledby="shipping-information-tab"
          tabIndex="0"
        >
          <ShippingTab returnPolicy={returnPolicy} shippingInfo={shippingInformation} />
        </div>
        <div
          className="tab-pane fade"
          id="pills-reviews"
          role="tabpanel"
          aria-labelledby="reviews-tab"
          tabIndex="0"
        >
          <ReviewsTab reviews={reviews} />
        </div>
      </div>
    </>
  );
};

export default ProductTabs;