import BookFormFields from "./BookFormFields";
import BookImagePicker from "./BookImagePicker";
import { ui } from "../../styles/ui";

export default function AddBookForm({
  bookForm,
  setBookForm,
  bookImageFile,
  setBookImageFile,
  fileInputKey,
  onSubmit,
  onCancel,
}) {
  return (
    <div className={ui.card}>
      <div className={ui.cardBody}>
        <h3 className={ui.sectionTitle}>Add New Book</h3>

        <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-4">
          <BookFormFields bookForm={bookForm} setBookForm={setBookForm} />

          <BookImagePicker
            imageFile={bookImageFile}
            setImageFile={setBookImageFile}
            fileInputKey={fileInputKey}
            required
            title={bookForm.title}
          />

          <div className="flex flex-col gap-3 sm:flex-row">
            <button type="submit" className={ui.primaryBtn}>
              Submit Book
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