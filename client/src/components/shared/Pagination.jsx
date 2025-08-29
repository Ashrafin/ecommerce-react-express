import "@/styles/Pagination.styles.css";

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  handlePageChange
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPageNumbers = () => {
    const pages = [];
    const start = Math.max(currentPage - 1, 1);
    const end = Math.min(currentPage + 1, totalPages);

    if (start > 1) pages.push(1);
    if (start > 2) pages.push("...");

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) pages.push("...");
    if (end < totalPages) pages.push(totalPages);

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="d-flex flex-row justify-content-center w-100 mt-5">
      <div
        className="btn-group btn-group-sm rounded-pill"
        role="group"
        aria-label="Small button group"
      >
        <button
          type="button"
          className="pagination-control-btn btn btn-outline border-light-subtle opacity-100 bg-light-subtle px-3 py-1 rounded-start-pill"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <i className={`bi bi-arrow-left-short fs-4 ${currentPage === 1 ? "text-body-tertiary" : "text-body-emphasis"}`} />
        </button>
        
        {pages.map((page, idx) => 
          page === "..." ? (
            <button
              key={`ellipsis-${idx}`}
              type="button"
              className="pagination-page-btn btn btn-outline border-light-subtle opacity-100 bg-light-subtle px-3 py-1 text-body-tertiary urbanist fw-semibold fs-5"
              disabled
            >
              ...
            </button>
          ) : (
            <button
              key={`page-${page}`}
              type="button"
              className={`pagination-page-btn btn btn-outline border-light-subtle px-3 py-1 urbanis fw-semibold ${currentPage === page ? "text-info-emphasis bg-info-subtle" : "text-body-emphasis bg-light-subtle"}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          )
        )}

        <button
          type="button"
          className="pagination-control-btn btn btn-outline border-light-subtle opacity-100 bg-light-subtle px-3 py-1 rounded-end-pill"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <i className={`bi bi-arrow-right-short fs-4 ${currentPage === totalPages ? "text-body-tertiary" : "text-body-emphasis"}`} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;