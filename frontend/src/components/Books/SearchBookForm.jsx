import { Search } from "lucide-react";
import { ui } from "../../styles/ui";

export default function SearchBookForm({
  searchTerm,
  setSearchTerm,
  onSearch,
  onFocus,
  onBlur,
  variant = "panel", // "panel" (default, used in BooksPage/AdminBooksPage) | "header"
  placeholder = "Search book by title, author, genre...",
}) {
  if (variant === "header") {
    return (
      <form onSubmit={onSearch} className={ui.homeSearchWrap}>
        <Search size={18} className={ui.homeSearchIcon} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          className={ui.homeSearchInput}
        />
      </form>
    );
  }

  return (
    <form onSubmit={onSearch} className="w-full max-w-2xl">
      <input
        className={ui.input}
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </form>
  );
}