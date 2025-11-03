import {
  useEffect,
  useRef,
  useState
} from "react";
import useFilters from "@/hooks/useFilters";
import CategoryFilters from "./CategoryFilters";
import PriceFilters from "./PriceFilters";
import Tooltip from "bootstrap/js/dist/tooltip";
import Collapse from "bootstrap/js/dist/collapse";

const Filters = ({ onApply }) => {
  const {
    draftFilters,
    setDraftFilters,
    applyFilters,
    clearFilters
  } = useFilters();
  const [isFilterOpened, setIsFilterOpened] = useState(false);
  const collapseRef = useRef(null);

  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="filtersTooltip"]');
    const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new Tooltip(tooltipTriggerEl));

    tooltipTriggerList.forEach((triggerEl) => {
      triggerEl.addEventListener("click", () => {
        const tooltip = Tooltip.getOrCreateInstance(triggerEl);
        tooltip.hide();
      });
    });

    return () => {
      tooltipList.forEach((tooltip) => tooltip.dispose());
    };
  }, []);

  const handleResetFilters = () => {
    clearFilters();
    const bsCollapse = Collapse.getOrCreateInstance(collapseRef.current);
    bsCollapse.hide();
    setIsFilterOpened(false);
  };

  const handleCollapseToggle = () => {
    const bsCollapse = Collapse.getOrCreateInstance(collapseRef.current);
    bsCollapse.toggle();
    setIsFilterOpened(prev => !prev);
  };

  const handleApplyFilters = () => {
    applyFilters(onApply);
    const bsCollapse = Collapse.getOrCreateInstance(collapseRef.current);
    bsCollapse.hide();
    setIsFilterOpened(false);
  };

  const _renderApplyFiltersBtn = () => {
    if (
      !draftFilters.categories.length &&
      draftFilters.minPrice === null &&
      draftFilters.maxPrice === null
    ) {
      return <></>;
    }

    return (
      <button
        className="btn btn-sm bg-light text-body-emphasis border-light-subtle inter fw-medium fs-7 rounded-5 py-2 px-3"
        type="button"
        onClick={handleApplyFilters}
      >
        Apply
      </button>
    );
  };

  return (
    <>
      <div className="d-flex mb-3">
        <div
          data-bs-toggle="filtersTooltip"
          data-bs-placement="right"
          data-bs-title="Filters"
        >
          <button
            className={`btn btn-sm px-3 rounded-pill ms-1 btn-outline ${isFilterOpened ? "bg-info-subtle" : "border-light-subtle opacity-100 bg-light-subtle"}`}
            type="button"
            onClick={handleCollapseToggle}
            aria-expanded={isFilterOpened}
            aria-controls="filtersCollapse"
          >
            <i className={`bi bi-sliders2 fs-6 ${isFilterOpened ? "text-body-emphasis" : "text-body-secondary"}`} />
          </button>
        </div>
      </div>
      <div className="col w-100 px-1">
        <div ref={collapseRef} className="collapse mb-3" id="filtersCollapse">
          <CategoryFilters
            draftFilters={draftFilters}
            setDraftFilters={setDraftFilters}
          />
          <PriceFilters
            draftFilters={draftFilters}
            setDraftFilters={setDraftFilters}
          />
          <div className="d-flex w-100 mt-3">
            <button
              className="btn btn-sm bg-light text-body-emphasis border-light-subtle inter fw-medium fs-7 rounded-5 py-2 px-3 me-2"
              type="button"
              onClick={handleResetFilters}
            >
              Reset
            </button>
            {_renderApplyFiltersBtn()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Filters;