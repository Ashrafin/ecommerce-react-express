import {
  useRef,
  useEffect,
  useState
} from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { easings } from "@/animations/easings";

const SearchBar = ({
  isSearchOpened,
  handleCloseSearch
}) => {
  const [isExiting, setIsExiting] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsExiting(true);
    handleCloseSearch();
  };

  const handleAnimationComplete = () => {
    if (isExiting && query.length) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  const slideInFromBottomTransition = {
    initial: {
      y: "100%"
    },
    animate: {
      y: 0,
      transition: {
        duration: 0.5,
        ease: easings.easeInQuad
      }
    },
    exit: {
      y: "100%",
      transition: {
        duration: 0.5,
        delay: 0.5,
        ease: easings.easeOutQuad
      }
    }
  };

  const slideOutFromLeftTransition = {
    initial: {
      opacity: 0,
      width: 40
    },
    animate: {
      opacity: 1,
      width: "60%",
      transition: {
        duration: 0.5,
        delay: 0.5,
        ease: easings.easeInQuad
      }
    },
    exit: {
      opacity: 0,
      width: 40,
      transition: {
        duration: 0.5,
        ease: easings.easeOutQuad
      }
    }
  };

  const fadeInTransition = {
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.5,
        ease: easings.easeInQuad
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: easings.easeOutQuad
      }
    }
  };

  useEffect(() => {
    if (isSearchOpened && inputRef.current) {
      inputRef.current.focus();
    }
  }, [
    inputRef,
    isSearchOpened
  ]);

  return (
    <>
      <motion.div
        className="bg-light vh-100 vw-100 position-fixed top-0 end-0"
        style={{ zIndex: 1021 }}
        {...slideInFromBottomTransition}
        onAnimationComplete={handleAnimationComplete}
      >
        <motion.span
          className="position-absolute"
          onClick={handleCloseSearch}
          style={{ cursor: "pointer", zIndex: 1022, top: 10, right: 10, lineHeight: 0 }}
          {...fadeInTransition}
        >
          <i className="bi bi-x fs-2 text-info-emphasis" />
        </motion.span>
      </motion.div>
      <motion.div
        className="position-absolute top-50 start-50 translate-middle bg-light-subtle rounded-pill border border-1 border-light-subtle ps-2 pe-3"
        style={{ zIndex: 1022, width: 40, height: "auto" }}
        {...slideOutFromLeftTransition}
      >
        <div className="input-group">
          <input
            id="search-input"
            name="search-input"
            ref={inputRef}
            type="text"
            value={query}
            placeholder="Search Product"
            onChange={(e) => setQuery(e.currentTarget.value)}
            className="form-control input-placeholder-text urbanist fw-medium bg-transparent border-0"
            aria-label="Search"
            style={{ outline: "none", boxShadow: "none" }}
          />
          <span
            className="input-group-text bg-transparent border-0 p-0"
            onClick={handleSubmit}
            style={{ cursor: query.length > 0 ? "pointer" : "not-allowed" }}
          >
            <i className={`bi bi-search fs-6 ${query.length > 0 ? "text-info-emphasis" : "text-body-tertiary"}`} />
          </span>
        </div>
      </motion.div>
    </>
  );
};

export default SearchBar;