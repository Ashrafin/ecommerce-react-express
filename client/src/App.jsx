import {
  useEffect,
  useState
} from "react";
import Container from "./components/ui/Container";
import CartCanvas from "./components/shared/CartCanvas";
import AnimatedRoutes from "./router/AnimatedRoutes";

const App = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const handleOpenCart = () => setIsCartOpen(true);
  const handleCloseCart = () => setIsCartOpen(false);

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", "light");
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <>
      <Container
        fluid
        utilityClasses="w-100 vw-100 d-flex flex-column px-0 position-relative"
      >
        <AnimatedRoutes handleOpenCart={handleOpenCart} />
        <CartCanvas
          isCartOpen={isCartOpen}
          handleCloseCart={handleCloseCart}
        />
      </Container>
    </>
  );
};

export default App;