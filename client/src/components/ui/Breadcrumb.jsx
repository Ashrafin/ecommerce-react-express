import { Link } from "react-router-dom";

const Breadcrumb = ({ items }) => {
  return (
    <nav aria-label="breadcrumb" className="my-3">
      <ol className="breadcrumb mb-0">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;

          return (
            <li
              key={i}
              className={`breadcrumb-item urbanist fw-semibold fs-6 ${isLast ? "text-secondary active" : ""}`}
              aria-current={isLast ? "page" : undefined}
            >
              {item.to ? (
                <Link
                  to={item.to}
                  className="text-body-tertiary link-offset-2 link-underline link-underline-opacity-0"
                >
                  {item.label}
                </Link>
              ) : item.onClick ? (
                <button
                  type="button"
                  onClick={item.onClick}
                  className="btn btn-link breadcrumb-item urbanist fw-semibold fs-6 text-body-tertiary link-offset-2 link-underline link-underline-opacity-0 p-0"
                  style={{ textDecoration: "none" }}
                >
                  {item.label}
                </button>
              ) : (
                item.label
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;