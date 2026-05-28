import { ui } from "../../styles/ui";

export default function AdminToolbar({
  activePanel,
  onShowSearch,
  onShowAdd,
}) {
  return (
    <div className={`${ui.card} ${ui.cardBody}`}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onShowSearch}
          className={activePanel === "search" ? ui.primaryBtn : ui.secondaryBtn}
        >
          Search Book
        </button>

        <button
          type="button"
          onClick={onShowAdd}
          className={activePanel === "add" ? ui.primaryBtn : ui.secondaryBtn}
        >
          Add New Book
        </button>
      </div>
    </div>
  );
}