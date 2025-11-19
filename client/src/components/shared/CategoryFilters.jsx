const CategoryFilters = ({
  draftFilters,
  setDraftFilters,
  availableCategories = []
}) => {
  const handleChangeCategoryChecked = (categoryName) => {
    const currentCategories = draftFilters.categories || [];
    const updatedCategories = currentCategories.includes(categoryName)
      ? currentCategories.filter(category => category !== categoryName)
      : [...currentCategories, categoryName];

    setDraftFilters({
      ...draftFilters,
      categories: updatedCategories
    });
  };

  return (
    <>
      <p className="urbanist fs-6 fw-bold mb-2">Categories</p>
      {availableCategories.map((category) => (
        <div key={category} className="form-check form-check-inline">
          <input
            id={category}
            className="form-check-input"
            type="checkbox"
            value={category}
            checked={draftFilters.categories?.includes(category)}
            onChange={() => handleChangeCategoryChecked(category)}
          />
          <label className="form-check-label fs-7" htmlFor={category}>
            {category}
          </label>
        </div>
      ))}
    </>
  );
};

export default CategoryFilters;