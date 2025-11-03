import useCategories from "@/hooks/useCategories";

const CategoryFilters = ({ draftFilters, setDraftFilters }) => {
  const {
    categories,
    categoriesIsLoading,
    categoriesHasError,
    categoriesError
  } = useCategories();

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

  if (categoriesIsLoading) return <></>;

  return (
    <>
      <p className="urbanist fs-6 fw-bold mb-2">Categories</p>
      {categories.map((category) => (
        <div key={category.slug} className="form-check form-check-inline">
          <input
            id={category.slug}
            className="form-check-input"
            type="checkbox"
            value={category.slug}
            checked={draftFilters.categories?.includes(category.slug)}
            onChange={() => handleChangeCategoryChecked(category.slug)}
          />
          <label className="form-check-label fs-7" htmlFor={category.slug}>
            {category.name}
          </label>
        </div>
      ))}
    </>
  );
};

export default CategoryFilters;