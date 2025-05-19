import "@/styles/Placeholder.styles.css";

const ProductCardPlaceholder = () => {
  return (
    <div className="col">
      <div className="card overflow-hidden" aria-hidden="true">
        <div className="placeholder-wave product-card-placeholder-img d-flex">
          <span className="placeholder col-12 h-100 bg-secondary"></span>
        </div>
        <div className="card-body">
          <h5 className="card-title placeholder-wave d-flex mb-2">
            <span className="placeholder product-card-placeholder-text-md col-3 me-2 rounded-5 bg-secondary"></span>
            <span className="placeholder product-card-placeholder-text-md col-3 rounded-5 bg-secondary"></span>
          </h5>
          <p className="card-text placeholder-wave d-flex flex-column">
            <span className="placeholder product-card-placeholder-text-lg col-10 mb-1 rounded-2 bg-secondary"></span>
            <span className="placeholder product-card-placeholder-text-lg col-12 mb-1 rounded-2 bg-secondary"></span>
            <span className="placeholder product-card-placeholder-text-sm col-4 mb-3 rounded-2 bg-secondary"></span>
            <span className="placeholder product-card-placeholder-text-md col-6 rounded-2 bg-secondary"></span>
          </p>
          <p className="placeholder-wave d-flex mb-0">
            <span className="placeholder product-card-placeholder-text-sm col-4 rounded-2 bg-secondary"></span>
          </p>
        </div>
      </div>
    </div>
  );
};

const BreadcrumbPlaceholder = () => {
  return (
    <p className="placeholder-wave mb-0">
      <span className="placeholder col-6 col-lg-3 rounded-3 bg-secondary mb-5"></span>
    </p>
  );
};

const CarouselPlaceholder = () => {
  return (
    <div className="placeholder-wave col-12 col-lg-6">
      <span className="carousel-placeholder placeholder col-12 rounded-3 bg-secondary"></span>
    </div>
  );
};

const ProductDetailsPlaceholder = () => {
  return (
    <div className="col-12 col-lg-6 col-lg-5 pt-4 ps-lg-5 pt-lg-0">
      <div className="placeholder-wave d-flex flex-column">
        <span className="placeholder col-6 col-md-4 rounded-3 bg-secondary mb-4"></span>
        <span className="placeholder col-6 col-md-3 rounded-3 bg-secondary mb-4"></span>
        <span className="detail-title-placeholder placeholder col-12 col-md-8 rounded-4 bg-secondary mb-4"></span>
        <span className="placeholder col-12 rounded-4 bg-secondary mb-1"></span>
        <span className="placeholder col-12 rounded-4 bg-secondary mb-1"></span>
        <span className="placeholder col-4 rounded-4 bg-secondary"></span>
        <div className="d-flex justify-content-between mt-4">
          <span className="detail-price-placeholder placeholder col-4 bg-secondary rounded-4"></span>
          <span className="detail-button-placeholder placeholder col-3 bg-secondary rounded-4"></span>
        </div>
      </div>
    </div>
  );
};

const placeholderComponents = {
  "product card": ProductCardPlaceholder,
  "breadcrumb": BreadcrumbPlaceholder,
  "carousel": CarouselPlaceholder,
  "product details": ProductDetailsPlaceholder,
};

const Placeholder = ({ type }) => {
  const Component = placeholderComponents[type];

  if (!Component) {
    console.warn(`Unknown placeholder type: ${type}`);
    return null;
  }
  
  return <Component />;
};

export default Placeholder;