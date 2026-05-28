import { ui } from "../../styles/ui";

export default function SearchBookForm({
  searchTerm,
  setSearchTerm,
  onSearch,
  onFocus,
  onBlur,
}) {
  return (
    <form onSubmit={onSearch} className="w-full max-w-2xl">
      <input
        className={ui.input}
        type="text"
        placeholder="Search book by title, author, genre..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </form>
  );
}