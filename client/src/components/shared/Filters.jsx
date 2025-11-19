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

const Filters = ({
  appliedFilters,
  availableCategories = []
}) => {
  const {
    draftFilters,
    setDraftFilters,
    applyFilters,
    clearFilters
  } = useFilters();
  const [isFilterOpened, setIsFilterOpened] = useState(false);
  const collapseRef = useRef(null);
  const { categories, minPrice, maxPrice } = appliedFilters;

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
    applyFilters();
    const bsCollapse = Collapse.getOrCreateInstance(collapseRef.current);
    bsCollapse.hide();
    setIsFilterOpened(false);
  };

  const handleRemoveCategory = (categoryToRemove) => {
    const modifiedCategories = draftFilters.categories.filter(category => category !== categoryToRemove);

    const updated = {
      ...draftFilters,
      categories: modifiedCategories
    };

    setDraftFilters(updated);
    applyFilters(updated);
  };

  const handleRemoveMinPrice = () => {
    const updated = {
      ...draftFilters,
      minPrice: null
    };

    setDraftFilters(updated);
    applyFilters(updated);
  };

  const handleRemoveMaxPrice = () => {
    const updated = {
      ...draftFilters,
      maxPrice: null
    };

    setDraftFilters(updated);
    applyFilters(updated);
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
        <div className="me-auto">
          {categories.length > 0 &&
            categories.map((category) => (
              <div
                key={category}
                className="d-inline-flex flex-row align-items-center badge rounded-pill bg-info-subtle py-1 ps-3 pe-2 me-2 mb-2"
              >
                <div className="d-flex flex-column justify-content-start align-items-start">
                  <span className="fs-8 fw-medium urbanist text-capitalize text-info-emphasis mb-1">Category</span>
                  <span className="fs-7 fw-medium inter text-capitalize text-info-emphasis">{category}</span>
                </div>
                <span
                  className="bg-light rounded-circle p-1 ms-2 opacity-75 text-info-emphasis pointer"
                  onClick={() => handleRemoveCategory(category)}
                >
                  <i className="bi bi-x fs-5" />
                </span>
              </div>
            ))
          }
          {(minPrice !== null && minPrice !== undefined && minPrice !== "") && (
            <div className="d-inline-flex flex-row align-items-center badge rounded-pill bg-info-subtle py-1 ps-3 pe-2 me-2 mb-2">
              <div className="d-flex flex-column justify-content-start align-items-start">
                <span className="fs-8 fw-medium urbanist text-capitalize text-info-emphasis mb-1">Min Price</span>
                <span className="fs-7 fw-medium inter text-capitalize text-info-emphasis">${minPrice}</span>
              </div>
              <span
                className="bg-light rounded-circle p-1 ms-2 opacity-75 text-info-emphasis pointer"
                onClick={() => handleRemoveMinPrice()}
              >
                <i className="bi bi-x fs-5" />
              </span>
            </div>
          )}
          {(maxPrice !== null && maxPrice !== undefined && maxPrice !== "") && (
            <div className="d-inline-flex flex-row align-items-center badge rounded-pill bg-info-subtle py-1 ps-3 pe-2 me-2 mb-2">
              <div className="d-flex flex-column justify-content-start align-items-start">
                <span className="fs-8 fw-medium urbanist text-capitalize text-info-emphasis mb-1">Max Price</span>
                <span className="fs-7 fw-medium inter text-capitalize text-info-emphasis">${maxPrice}</span>
              </div>
              <span
                className="bg-light rounded-circle p-1 ms-2 opacity-75 text-info-emphasis pointer"
                onClick={() => handleRemoveMaxPrice()}
              >
                <i className="bi bi-x fs-5" />
              </span>
            </div>
          )}
        </div>
        <div
          className="ms-auto"
          data-bs-toggle="filtersTooltip"
          data-bs-placement="right"
          data-bs-title="Filters"
        >
          <button
            className={`btn btn-sm px-3 rounded-pill btn-outline ${isFilterOpened ? "bg-info-subtle" : "border-light-subtle opacity-100 bg-light-subtle"}`}
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
            availableCategories={availableCategories}
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