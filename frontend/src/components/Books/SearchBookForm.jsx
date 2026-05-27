export default function SearchBookForm({
  searchTerm,
  setSearchTerm,
  onSearch,
}) {
  return (
    <form id="searchQueryForm" onSubmit={onSearch} style={{ display: "inline-block" }}>
      <input
        type="text"
        id="searchQueryInput"
        placeholder="search book..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit" id="getBooksBtn">
        search
      </button>
    </form>
  );
}