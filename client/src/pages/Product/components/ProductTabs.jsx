import { useState } from "react";
import { motion } from "motion/react";
import { easings } from "@/animations/easings";
import ReviewsTab from "./ReviewsTab";
import ShippingTab from "./ShippingTab";
import DetailsTab from "./DetailsTab";
import "@/styles/ProductTabs.styles.css";

const tabs = [
  { key: "details", label: "Product Details" },
  { key: "shipping", label: "Shipping Information" },
  { key: "reviews", label: "Reviews & Ratings" }
];

const ProductTabs = ({
  weight,
  warrantyInformation,
  dimensions,
  returnPolicy,
  shippingInformation,
  reviews
}) => {
  const [activeTab, setActiveTab] = useState("details");
  const tabContentsMap = {
    details: <DetailsTab weight={weight} warrantyInformation={warrantyInformation} dimensions={dimensions} />,
    shipping: <ShippingTab returnPolicy={returnPolicy} shippingInfo={shippingInformation} />,
    reviews: <ReviewsTab reviews={reviews} />
  };
  const slideTransition = {
    transition: {
      duration: 0.3,
      ease: easings.easeInOutQuad
    }
  };

  return (
    <>
      <div className="productInfo-stagger-item d-flex product-tabs rounded-5 bg-light w-100 overflow-x-scroll p-2 mb-4">
        <ul className="nav nav-pills m-0" role="tablist">
          {tabs.map(({ key, label }) => (
            <li key={key} className="nav-item flex-fill" role="presentation">
              <button
                className={`nav-link text-info-emphasis urbanist fw-semibold rounded-pill w-100 position-relative`}
                type="button"
                role="tab"
                aria-selected={activeTab === key}
                onClick={() => setActiveTab(key)}
              >
                {activeTab === key && (
                  <motion.div
                    layoutId="tabHighlight"
                    className="position-absolute top-0 start-0 w-100 h-100 rounded-pill bg-info-subtle z-0"
                    {...slideTransition}
                  />
                )}
                <span className="position-relative z-1">{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      {tabContentsMap[activeTab]}
    </>
  );
};

export default ProductTabs;