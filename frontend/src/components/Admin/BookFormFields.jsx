import { ui } from "../../styles/ui";
import {
  restrictAuthorInput,
  restrictTitleInput,
} from "../../utils/inputGuards";

export default function BookFormFields({ bookForm, setBookForm }) {
  const hasDiscount = Number(bookForm.discount) > 0;

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
        <option value="Poetry">Poetry</option>
        <option value="Mystery">Mystery</option>
        <option value="Thriller">Thriller</option>
        <option value="Children">Children</option>
        <option value="Religious">Religious</option>
        <option value="Self-help">Self-help</option>
        <option value="Other">Other</option>
      </select>

      <input
        className={ui.input}
        type="number"
        min="0"
        placeholder="Stock Quantity *"
        value={bookForm.stockQuantity}
        onChange={(e) =>
          setBookForm((prev) => ({
            ...prev,
            stockQuantity: e.target.value,
          }))
        }
      />

      <input
        className={ui.input}
        type="number"
        min="0"
        step="0.01"
        placeholder="Price *"
        value={bookForm.price}
        onChange={(e) =>
          setBookForm((prev) => ({
            ...prev,
            price: e.target.value,
          }))
        }
      />

      <input
        className={ui.input}
        type="number"
        min="0"
        max="100"
        placeholder="Discount (%)"
        value={bookForm.discount}
        onChange={(e) => {
          const nextDiscount = e.target.value;

          setBookForm((prev) => ({
            ...prev,
            discount: nextDiscount,
            discountHours: Number(nextDiscount) > 0 ? prev.discountHours : "",
          }));
        }}
      />

      {hasDiscount && (
        <input
          className={ui.input}
          type="number"
          min="1"
          step="1"
          placeholder="Discount Duration (hours)"
          value={bookForm.discountHours}
          onChange={(e) =>
            setBookForm((prev) => ({
              ...prev,
              discountHours: e.target.value,
            }))
          }
        />
      )}
    </div>
  );
}
