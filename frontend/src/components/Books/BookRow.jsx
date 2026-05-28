import { ui } from "../../styles/ui";

export default function BookRow({ book, showActions = false, onEdit, onRemove }) {
  return (
    <tr className={ui.tr}>
      <td className={`${ui.td} rounded-l-2xl`}>{book.title || ""}</td>
      <td className={ui.td}>{book.author || ""}</td>
      <td className={ui.td}>{book.isbn || "—"}</td>
      <td className={ui.td}>{book.publishedYear || "—"}</td>
      <td className={ui.td}>{book.genre || "—"}</td>
      <td className={ui.td}>{book.availableCopies ?? 0}</td>

      {showActions && (
        <>
          <td className={ui.td}>
            <button
              type="button"
              onClick={() => onEdit(book._id)}
              className={ui.secondaryBtn}
            >
              Edit
            </button>
          </td>
          <td className={`${ui.td} rounded-r-2xl`}>
            <button
              type="button"
              onClick={() => onRemove(book._id)}
              className={ui.dangerBtn}
            >
              Remove
            </button>
          </td>
        </>
      )}
    </tr>
  );
}