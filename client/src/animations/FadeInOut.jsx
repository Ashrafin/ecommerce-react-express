import { motion } from "motion/react";

const FadeInOut = ({
  identifier: key,
  children,
  duration = 0.35,
  delay = 0.1,
  ease = [0.37, 0, 0.63, 1],
  customStyles = "",
  customClasses = ""
}) => {
  const fadeInOut = {
    initial: {
      opacity: 0,
      y: -20
    },
    animate: {
      opacity: 1,
      y: 0
    },
    exit: {
      opacity: 0,
      y: -20
    },
    transition: {
      duration: duration,
      delay: delay,
      ease: ease
    }
  };

  return (
    <motion.div
      key={key}
      className={customClasses}
      {...fadeInOut}
      style={customStyles}
    >
      {children}
    </motion.div>
  );
};

export default FadeInOut;