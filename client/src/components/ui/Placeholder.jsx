import "@/styles/Placeholder.styles.css";

const ProductCardPlaceholder = () => {
  return (
    <div className="col">
      <div className="card product-card-placeholder border-1 border-light-subtle rounded-5 position-relative bg-secondary-subtle" aria-hidden="true">
        <div style={{ top: 15, left: 15 }} className="placeholder-wave d-flex position-absolute w-100">
          <span className="placeholder placeholder-discount w-25 rounded-4 bg-danger"></span>
        </div>
        <div className="placeholder-wave placeholder-img d-flex">
          <span className="placeholder w-100 h-100 bg-secondary-subtle"></span>
        </div>
        <div className="card-body border-top border-1 border-light-subtle bg-white">
          <h5 className="card-title placeholder-wave d-flex mb-3">
            <span className="placeholder placeholder-categories w-25 me-2 rounded-4 bg-secondary-subtle"></span>
            <span className="placeholder placeholder-categories w-25 rounded-4 bg-secondary-subtle"></span>
          </h5>
          <p className="card-text placeholder-wave d-flex flex-column mb-0">
            <span className="placeholder placeholder-title w-75 rounded-4 bg-secondary mb-1"></span>
            <span className="placeholder placeholder-desc w-100 rounded-4 bg-secondary-subtle mb-1"></span>
            <span className="placeholder placeholder-rating w-50 rounded-4 bg-secondary-subtle"></span>
            <span className="placeholder placeholder-price w-50 rounded-4 bg-success-subtle my-3"></span>
          </p>
          <p className="placeholder-wave d-flex mb-0">
            <span className="placeholder placeholder-button w-75 rounded-4 bg-info-subtle me-1"></span>
            <span className="placeholder placeholder-button w-25 rounded-4 bg-info-subtle ms-1"></span>
          </p>
        </div>
      </div>
    </div>
  );
};

const BreadcrumbPlaceholder = () => {
  return (
    <p className="breadcrumb-placeholder placeholder-wave d-flex mb-5">
      <span className="placeholder col-4 col-lg-1 rounded-4 bg-secondary opacity-25 me-1"></span>
      <span className="placeholder col-4 col-lg-2 rounded-4 bg-secondary opacity-50"></span>
    </p>
  );
};

const CarouselPlaceholder = () => {
  return (
    <div className="placeholder-wave col-12 col-lg-6">
      <span className="placeholder placeholder-carousel col-12 rounded-5 bg-secondary opacity-25"></span>
    </div>
  );
};

const ProductDetailsPlaceholder = () => {
  return (
    <div className="product-details-placeholder col-12 col-lg-6 col-lg-5 pt-4 ps-lg-5 pt-lg-0">
      <div className="placeholder-wave d-flex flex-column">
        <span className="placeholder placeholder-brand col-6 col-md-4 rounded-4 bg-secondary mb-3"></span>
        <div className="d-flex mb-4">
          <span className="placeholder col-2 rounded-4 placeholder-categories bg-secondary-subtle me-2"></span>
          <span className="placeholder col-2 rounded-4 placeholder-categories bg-secondary-subtle"></span>
        </div>
        <span className="placeholder placeholder-title col-12 col-md-8 rounded-5 bg-secondary mb-1"></span>
        <span className="placeholder placeholder-desc col-12 rounded-4 bg-secondary-subtle mb-1"></span>
        <span className="placeholder placeholder-ratings col-6 col-md-4 rounded-4 bg-secondary-subtle mb-4"></span>
        <div className="d-flex justify-content-between mb-4">
          <span className="placeholder placeholder-price col-5 col-md-3 rounded-4 bg-success-subtle"></span>
          <span className="placeholder placeholder-button col-5 col-md-3 rounded-4 bg-info-subtle"></span>
        </div>
        <div className="d-flex bg-light rounded-5 w-100 p-2 mb-4">
          <span className="placeholder placeholder-tab col-4 rounded-pill bg-info-subtle"></span>
        </div>
        <div className="d-flex">
          <div className="placeholder placeholder-info w-50 rounded-4 bg-light border border-1 border-light-subtle me-2"></div>
          <div className="placeholder placeholder-info w-50 rounded-4 bg-light border border-1 border-light-subtle ms-2"></div>
        </div>
      </div>
    </div>
  );
};

const RecommendedProductsPlaceholder = () => {
  return (
    <div className="recommended-products-placeholder d-flex flex-column my-5">
      <div className="placeholder-wave mb-4">
        <span className="placeholder placeholder-title bg-secondary rounded-5 col-6 col-md-3"></span>
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {[...Array(4)].map((_, i) => <Placeholder key={i} type="product card" />)}
      </div>
    </div>
  );
};

const placeholderComponents = {
  "product card": ProductCardPlaceholder,
  "breadcrumb": BreadcrumbPlaceholder,
  "carousel": CarouselPlaceholder,
  "product details": ProductDetailsPlaceholder,
  "recommended products": RecommendedProductsPlaceholder
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