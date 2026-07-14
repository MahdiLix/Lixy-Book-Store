import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import AddBookForm from "../../components/Admin/AddBookForm";
import FeedbackMessage from "../../components/Shared/FeedbackMessage";
import { addBook } from "../../api/booksApi";
import { clearAuthToken, getAuthToken } from "../../utils/auth";
import { createEmptyBookForm } from "../../utils/bookForm";
import { ui } from "../../styles/ui";

export default function AddBookPage() {
  const navigate = useNavigate();
  const [bookForm, setBookForm] = useState(createEmptyBookForm());
  const [bookImageFile, setBookImageFile] = useState(null);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("notice");
  const [loading, setLoading] = useState(false);

  async function handleAddBook(e) {
    e.preventDefault();
    setMessage("");

    if (!bookForm.title.trim() || !bookForm.author.trim()) {
      setType("error");
      setMessage("Title and Author is required!");

      setTimeout(() => {
        setMessage("");
      }, 3000);

      return;
    }

    if (!bookImageFile) {
      setType("error");
      setMessage("Book image is required!");

      setTimeout(() => {
        setMessage("");
      }, 3000);

      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", bookForm.title.trim());
      formData.append("author", bookForm.author.trim());

      if (bookForm.publishedYear.trim()) {
        formData.append("publishedYear", bookForm.publishedYear.trim());
      }

      if (bookForm.genre) {
        formData.append("genre", bookForm.genre);
      }

      if (bookForm.stockQuantity !== "") {
        formData.append("stockQuantity", bookForm.stockQuantity);
      }
      if (bookForm.price !== "") {
        formData.append("price", bookForm.price);
      }
      if (bookForm.discount !== "") {
        formData.append("discount", bookForm.discount);
      }

      // Convert hours to Date and append for the backend schema
      if (Number(bookForm.discount) > 0 && bookForm.discountHours) {
        const endDate = new Date(
          Date.now() + Number(bookForm.discountHours) * 60 * 60 * 1000,
        );
        formData.append("discountEndDate", endDate.toISOString());
      }

      formData.append("bookImage", bookImageFile);

      await addBook(formData, getAuthToken());

      setBookForm(createEmptyBookForm());
      setBookImageFile(null);
      setFileInputKey((prev) => prev + 1);

      setType("success");
      setMessage("Book added successfully.");

      // Brief pause so the success message is visible before leaving.
      setTimeout(() => {
        navigate("/admin/books");
      }, 800);
    } catch (err) {
      if (err.message === "UNAUTHORIZED") {
        clearAuthToken();
        navigate("/login", { replace: true });
        return;
      }

      setType("error");
      setMessage(`Failed to add book: ${err.message}`);

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={ui.page}>
      <Header logoutRedirectTo="/login" />

      <div className={ui.pageTopSpace}>
        <div className={ui.container}>
          <div className="flex flex-col gap-6">
            <h1 className={ui.sectionTitle}>Add New Book</h1>

            <AddBookForm
              bookForm={bookForm}
              setBookForm={setBookForm}
              bookImageFile={bookImageFile}
              setBookImageFile={setBookImageFile}
              fileInputKey={fileInputKey}
              onSubmit={handleAddBook}
              onCancel={() => navigate("/admin/books")}
              loading={loading}
            />

            <FeedbackMessage message={message} type={type} />
          </div>
        </div>
      </div>
    </main>
  );
}
