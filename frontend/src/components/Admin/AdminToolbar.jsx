export default function AdminToolbar({
  activePanel,
  onShowSearch,
  onShowAdd,
}) {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
      <button
        type="button"
        onClick={onShowSearch}
        disabled={activePanel === "search"}
      >
        search books
      </button>

      <button
        type="button"
        onClick={onShowAdd}
        disabled={activePanel === "add"}
      >
        add new book
      </button>
    </div>
  );
}