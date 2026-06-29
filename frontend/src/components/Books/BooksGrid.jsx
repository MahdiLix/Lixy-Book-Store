import BookCard from "./BookCard";
import { ui } from "../../styles/ui";


export default function BooksGrid({ books, onSelect }) {
  if (!books || books.length === 0) {
    return <div className={ui.notice}>No Books Found!</div>;
  }

  return (
    <div className={ui.booksGrid}>
      {books.map((book) => (
        <BookCard key={book._id} book={book} onSelect={onSelect} />
      ))}
    </div>
  );
}