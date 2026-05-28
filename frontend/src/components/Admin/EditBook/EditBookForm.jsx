import BookFormFields from "../BookFormFields";
import { ui } from "../../../styles/ui";

export default function EditBookForm({
  bookForm,
  setBookForm,
  onSubmit,
  onCancel,
}) {
  return (
    <div className={ui.card}>
      <div className={ui.cardBody}>
        <h3 className={ui.sectionTitle}>Edit Book</h3>

        <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-4">
          <BookFormFields bookForm={bookForm} setBookForm={setBookForm} />

          <div className="flex flex-col gap-3 sm:flex-row">
            <button type="submit" className={ui.primaryBtn}>
              Update Book
            </button>
            <button type="button" onClick={onCancel} className={ui.secondaryBtn}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}