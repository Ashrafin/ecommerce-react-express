import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { motion } from "motion/react";
import Container from "@/components/ui/Container";

const SigningOutPage = () => {
  const { logout } = useAuth0();

  useEffect(() => {
    // Small timeout to allow the entry animation to complete or start before redirecting
    const timer = setTimeout(() => {
      logout({ logoutParams: { returnTo: window.location.origin } });
    }, 500);

    return () => clearTimeout(timer);
  }, [logout]);

  return (
    <Container utilityClasses="d-flex flex-column align-items-center justify-content-center vh-100">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <h2 className="urbanist fw-bold fs-3 text-body-emphasis">Signing you out...</h2>
      </motion.div>
    </Container>
  );
};

export default SigningOutPage;
