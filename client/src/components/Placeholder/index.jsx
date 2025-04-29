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

const placeholderComponents = {
  "product card": ProductCardPlaceholder,
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