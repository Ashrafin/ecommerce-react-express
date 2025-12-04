import { createPortal } from "react-dom";

const BodyPortal = ({ children }) => {
  return createPortal(children, document.body);
};

export default BodyPortal;