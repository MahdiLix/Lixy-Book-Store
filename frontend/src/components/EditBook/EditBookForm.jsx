import { restrictAuthorInput, restrictTitleInput } from "../../utils/inputGuards";

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
        <input
          type="text"
          id="title"
          placeholder="Title *"
          required
          value={bookForm.title}
          onChange={(e) =>
            setBookForm((prev) => ({ ...prev, title: e.target.value }))
          }
          onKeyDown={restrictTitleInput}
        />
        <br />

        <input
          type="text"
          id="author"
          placeholder="Author *"
          required
          value={bookForm.author}
          onChange={(e) =>
            setBookForm((prev) => ({ ...prev, author: e.target.value }))
          }
          onKeyDown={restrictAuthorInput}
        />
        <br />

        <input
          type="number"
          id="publishedYear"
          placeholder="publishedYear"
          value={bookForm.publishedYear}
          onChange={(e) =>
            setBookForm((prev) => ({ ...prev, publishedYear: e.target.value }))
          }
        />
        <br />

        <select
          id="genre"
          value={bookForm.genre}
          onChange={(e) =>
            setBookForm((prev) => ({ ...prev, genre: e.target.value }))
          }
        >
          <option value="">Select Book Genre (optional)</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Science">Science</option>
          <option value="Computer">Computer</option>
          <option value="History">History</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Biography">Biography</option>
          <option value="Other">Other</option>
        </select>
        <br />

        <input
          type="number"
          id="availableCopies"
          min="0"
          placeholder="available copies"
          value={bookForm.availableCopies}
          onChange={(e) =>
            setBookForm((prev) => ({
              ...prev,
              availableCopies: e.target.value,
            }))
          }
        />

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