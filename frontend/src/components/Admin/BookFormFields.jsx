import { ui } from "../../styles/ui";
import {
  restrictAuthorInput,
  restrictTitleInput,
} from "../../utils/inputGuards";

export default function BookFormFields({ bookForm, setBookForm }) {
  return (
    <div className="flex flex-col gap-4">
      <input
        className={ui.input}
        type="text"
        placeholder="Title *"
        value={bookForm.title}
        onChange={(e) =>
          setBookForm((prev) => ({ ...prev, title: e.target.value }))
        }
        onKeyDown={restrictTitleInput}
      />

      <input
        className={ui.input}
        type="text"
        placeholder="Author *"
        value={bookForm.author}
        onChange={(e) =>
          setBookForm((prev) => ({ ...prev, author: e.target.value }))
        }
        onKeyDown={restrictAuthorInput}
      />

      <input
        className={ui.input}
        type="number"
        placeholder="Published Year"
        value={bookForm.publishedYear}
        onChange={(e) =>
          setBookForm((prev) => ({ ...prev, publishedYear: e.target.value }))
        }
      />

      <select
        className={ui.select}
        value={bookForm.genre}
        onChange={(e) =>
          setBookForm((prev) => ({ ...prev, genre: e.target.value }))
        }
      >
        <option value="">Select Book Genre (optional)</option>
        <option value="Fiction">Fiction</option>
        <option value="Love">Love</option>
        <option value="Novel">Novel</option>
        <option value="History">History</option>
        <option value="Science Fiction">Science Fiction</option>
        <option value="Fantasy">Fantasy</option>
        <option value="Biography">Biography</option>
        <option value="Other">Other</option>
      </select>

      <input
        className={ui.input}
        type="number"
        min="0"
        placeholder="Stock Quantity"
        value={bookForm.stockQuantity}
        onChange={(e) =>
          setBookForm((prev) => ({
            ...prev,
            stockQuantity: e.target.value,
          }))
        }
      />
    </div>
  );
}
