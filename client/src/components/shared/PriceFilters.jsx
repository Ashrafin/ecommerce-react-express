const MIN_PRICE_OPTIONS = [0, 50, 100, 250, 500];
const MAX_PRICE_OPTIONS = [100, 250, 500, 1000, 2000];

const PriceFilters = ({ selectedFilters, setSelectedFilters }) => {
  const handleChangeMinPrice = (price) => {
    setSelectedFilters((prev) => ({
      ...prev,
      minPrice: price
    }));
  };

  const handleChangeMaxPrice = (price) => {
    setSelectedFilters((prev) => ({
      ...prev,
      maxPrice: price
    }));
  };

  return (
    <>
      <p className="urbanist fs-6 fw-bold mb-2 mt-3">Minimum Prices</p>
      {MIN_PRICE_OPTIONS.map((price) => (
        <div key={`min-${price}`} className="form-check form-check-inline">
          <input
            id={`min-${price}`}
            className="form-check-input"
            type="radio"
            value={price}
            checked={selectedFilters.minPrice === price}
            onChange={() => handleChangeMinPrice(price)}
          />
          <label className="form-check-label fs-7" htmlFor={`min-${price}`}>
            From ${price}
          </label>
        </div>
      ))}
      <p className="urbanist fs-6 fw-bold mb-2 mt-3">Maximum Prices</p>
      {MAX_PRICE_OPTIONS.map((price) => (
        <div key={`max-${price}`} className="form-check form-check-inline">
          <input
            id={`max-${price}`}
            className="form-check-input"
            type="radio"
            value={price}
            checked={selectedFilters.maxPrice === price}
            onChange={() => handleChangeMaxPrice(price)}
          />
          <label className="form-check-label fs-7" htmlFor={`max-${price}`}>
            From ${price}
          </label>
        </div>
      ))}
    </>
  );
};

export default PriceFilters;