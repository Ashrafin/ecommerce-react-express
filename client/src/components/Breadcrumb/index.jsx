import { Link } from "react-router-dom";

const Breadcrumb = ({ product }) => {
  return (
    <nav aria-label="breadcrumb" className="mb-5">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">{product.title}</li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;