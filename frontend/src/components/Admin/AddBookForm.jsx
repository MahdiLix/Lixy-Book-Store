import BookFormFields from "./BookFormFields";
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

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Book Image <span className="text-rose-500">*</span>
            </label>

            <input
              key={fileInputKey}
              type="file"
              accept="image/*"
              required
              className="block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-white hover:file:bg-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              onChange={(e) => setBookImageFile(e.target.files?.[0] || null)}
            />

            {bookImageFile ? (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Selected: {bookImageFile.name}
              </p>
            ) : (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Image is required.
              </p>
            )}
          </div>

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