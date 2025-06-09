import { Link } from "react-router-dom";

const Breadcrumb = ({ items }) => {
  return (
    <nav aria-label="breadcrumb" className="my-3">
      <ol className="breadcrumb mb-0">
        {items.map((item, i) => (
          <li
            key={i}
            className={`breadcrumb-item urbanist fw-semibold fs-6 ${i === items.length - 1 ? "text-secondary active" : ""}`}
            aria-current={i === items.length - 1 ? "page" : undefined}
          >
            {item.to ? <Link to={item.to} className="text-body-tertiary link-offset-2 link-underline link-underline-opacity-0">{item.label}</Link> : item.label}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;