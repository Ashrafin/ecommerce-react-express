import { motion } from "motion/react";

const StaggeredFadeIn = ({
  identifier: key,
  index,
  children,
  duration = 0.35,
  delay = 0.1,
  ease = [0.37, 0, 0.63, 1],
  customStyles = "",
  customClasses = ""
}) => {
  const fadeIn = {
    initial: {
      opacity: 0,
      y: 20
    },
    whileInView: {
      opacity: 1,
      y: 0
    },
    viewport: {
      once: true
    },
    exit: {
      opacity: 0,
      y: 20
    },
    transition: {
      duration: duration,
      delay: delay,
      // delay: index * delay / 1.4,
      ease: ease
    }
  };

  return (
    <motion.div
      key={key}
      className={customClasses}
      {...fadeIn}
      style={customStyles}
    >
      {children}
    </motion.div>
  );
};

export default StaggeredFadeIn;