import { useEffect } from "react";
import Container from "./components/ui/Container";
import CartCanvas from "./components/shared/CartCanvas";
import AnimatedRoutes from "./router/AnimatedRoutes";

const App = () => {
  useEffect(() => {
    document.body.setAttribute("data-bs-theme", "light");
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <Container
      fluid
      utilityClasses="w-100 vw-100 d-flex flex-column px-0"
    >
      <AnimatedRoutes />
      <CartCanvas />
    </Container>
  );
};

export default App;