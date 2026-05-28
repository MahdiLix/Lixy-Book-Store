import BookFormFields from "./BookFormFields";

export default function AddBookForm({
  bookForm,
  setBookForm,
  onSubmit,
  onCancel,
}) {
  return (
    <div id="addNewBookContainer">
      <h3>Add New Book</h3>

      <form id="addNewBookForm" onSubmit={onSubmit}>
        <BookFormFields bookForm={bookForm} setBookForm={setBookForm} />

        <div>
          <button type="submit" id="submitAddBookBtn">
            submit book
          </button>
          <button type="button" id="cancelAddBookBtn" onClick={onCancel}>
            cancel add book
          </button>
        </div>
      </form>
    </div>
  );
}