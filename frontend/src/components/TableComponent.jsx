import BookRow from "./BookRow";

export default function BooksTable({ books }) {
  if (!books || books.length === 0) {
    return null;
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
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <BookRow key={book._id} book={book} />
        ))}
      </tbody>
    </table>
  );
}