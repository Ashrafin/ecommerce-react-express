import { motion } from "motion/react";

export const FadeInOut = ({
  identifier: key,
  children,
  duration = 0.35,
  delay = 0,
  ease = "linear",
  customStyles = "",
  customClasses = ""
}) => {
  const fadeInOut = {
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1
    },
    exit: {
      opacity: 0
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