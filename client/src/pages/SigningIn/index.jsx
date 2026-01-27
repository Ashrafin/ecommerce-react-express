import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { motion } from "motion/react";
import Container from "@/components/ui/Container";

const SigningInPage = () => {
  const { loginWithRedirect } = useAuth0();

  useEffect(() => {
    const timer = setTimeout(() => {
      loginWithRedirect();
    }, 500);

    return () => clearTimeout(timer);
  }, [loginWithRedirect]);

  return (
    <Container
      utilityClasses="d-flex flex-column align-items-center justify-content-center"
      customStyles={{ height: "calc(100vh - 60px)" }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <h2 className="urbanist fw-bold fs-3 text-body-emphasis">
          Taking you to login...
        </h2>
      </motion.div>
    </Container>
  );
};

export default SigningInPage;
