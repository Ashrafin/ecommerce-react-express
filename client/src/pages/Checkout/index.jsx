import { useEffect } from "react";
import {
  useLocation,
  useNavigate
} from "react-router-dom";
import Container from "@/components/ui/Container";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.state?.fromCartPage) {
      navigate("/cart");
    }
  }, [
    location,
    navigate
  ]);

  return (
    <Container
      utilityClasses="py-5 px-3 px-md-4"
    >
      <h1 className="fw-bold fs-4 urbanist text-body-emphasis mb-4">
        Checkout
      </h1>
    </Container>
  );
};

export default CheckoutPage;