function BookRow({ book, showAdminActions, onEdit, onRemove }) {
  return (
    <tr>
      <td>{book.title || ""}</td>
      <td>{book.author || ""}</td>
      <td>{book.isbn || "—"}</td>
      <td>{book.publishedYear || "—"}</td>
      <td>{book.genre || "—"}</td>
      <td>{book.availableCopies ?? 0}</td>

      {showAdminActions && (
        <>
          <td>
            <button type="button" onClick={() => onEdit(book._id)}>
              Edit
            </button>
          </td>
          <td>
            <button type="button" onClick={() => onRemove(book._id)}>
              Remove
            </button>
          </td>
        </>
      )}
    </tr>
  );
}

export default function BooksTable({ books, showAdminActions = false, onEdit, onRemove }) {
  if (!books || books.length === 0) {
    return <p>No Books Found!</p>;
  }

  return (
    <table id="booksTable">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>ISBN</th>
          <th>Year</th>
          <th>Genre</th>
          <th>Available</th>
          {showAdminActions && <><th>Edit</th><th>Remove</th></>}
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <BookRow
            key={book._id}
            book={book}
            showAdminActions={showAdminActions}
            onEdit={onEdit}
            onRemove={onRemove}
          />
        ))}
      </tbody>
    </table>
  );
}