import BookRow from "./BookRow";
import { ui } from "../../styles/ui";

export default function BooksTable({
  books,
  showActions = false,
  onEdit,
  onRemove,
}) {
  if (!books || books.length === 0) {
    return <div className={ui.notice}>No Books Found!</div>;
  }

  return (
    <div className={ui.tableWrap}>
      <table className={ui.table}>
        <thead>
          <tr>
            <th className={ui.th}>Image</th>
            <th className={ui.th}>Title</th>
            <th className={ui.th}>Author</th>
            <th className={ui.th}>ISBN</th>
            <th className={ui.th}>Year</th>
            <th className={ui.th}>Genre</th>
            <th className={ui.th}>Available</th>
            {showActions && <th className={ui.th}>Edit</th>}
            {showActions && <th className={ui.th}>Remove</th>}
          </tr>
        </thead>

        <tbody>
          {books.map((book) => (
            <BookRow
              key={book._id}
              book={book}
              showActions={showActions}
              onEdit={onEdit}
              onRemove={onRemove}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}