import BookFormFields from "../BookFormFields";

export default function EditBookForm({
  bookForm,
  setBookForm,
  onSubmit,
  onCancel,
}) {
  return (
    <div id="editBookContainer">
      <h3>Edit Book</h3>

      <form id="editBookForm" onSubmit={onSubmit}>
        <BookFormFields bookForm={bookForm} setBookForm={setBookForm} />

        <div>
          <button type="submit" id="submitEditdBook">
            submit book
          </button>
          <button type="button" id="cancelEditBook" onClick={onCancel}>
            cancel
          </button>
        </div>
      </form>
    </div>
  );
}