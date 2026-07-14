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
            <th className={ui.th}>image</th>
            <th className={ui.th}>title</th>
            <th className={ui.th}>author</th>
            <th className={ui.th}>isbn</th>
            <th className={ui.th}>published year</th>
            <th className={ui.th}>genre</th>
            <th className={ui.th}>stock quantity</th>
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