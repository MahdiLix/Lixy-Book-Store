export default function BookRow({ book }) {
  return (
    <tr>
      <td>{book.title || ""}</td>
      <td>{book.author || ""}</td>
      <td>{book.isbn || "—"}</td>
      <td>{book.publishedYear || "—"}</td>
      <td>{book.genre || "—"}</td>
      <td>{book.availableCopies ?? 0}</td>
    </tr>
  );
}