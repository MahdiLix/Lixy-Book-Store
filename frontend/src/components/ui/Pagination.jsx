import { ChevronLeft, ChevronRight } from "lucide-react";
import { ui } from "../../styles/ui";

export default function Pagination({ pagination, onPageChange }) {
  // If no pagination data exists, or total is 0, don't show anything
  if (!pagination || !pagination.total || pagination.total === 0) {
    return null;
  }

  // Match with my Backend side data
  const { total, page = 1, limit = 8 } = pagination;

  const totalPages = Math.ceil(total / limit);
  const hasPrevPage = page > 1;
  const hasNextPage = page * limit < total;

  // If there's only 1 page, don't render the pagination
  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = [];
  const maxButtons = 5;

  if (totalPages <= maxButtons) {
    for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
  } else {
    pageNumbers.push(1);
    if (page > 3) pageNumbers.push("...");

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let i = start; i <= end; i++) pageNumbers.push(i);

    if (page < totalPages - 2) pageNumbers.push("...");
    pageNumbers.push(totalPages);
  }

  return (
    <div className={ui.paginationWrap}>
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={!hasPrevPage}
        className={`${ui.pageBtn} ${!hasPrevPage ? "opacity-50 cursor-not-allowed" : ""}`}
        aria-label="Previous page"
      >
        <ChevronLeft size={18} />
      </button>

      {pageNumbers.map((num, index) =>
        num === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className="px-2 text-slate-500 dark:text-slate-400"
          >
            ...
          </span>
        ) : (
          <button
            key={num}
            onClick={() => onPageChange(num)}
            className={`${ui.pageBtn} ${num === page ? ui.pageBtnActive : ""}`}
          >
            {num}
          </button>
        ),
      )}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={!hasNextPage}
        className={`${ui.pageBtn} ${!hasNextPage ? "opacity-50 cursor-not-allowed" : ""}`}
        aria-label="Next page"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
