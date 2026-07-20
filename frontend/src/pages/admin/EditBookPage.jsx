import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Layout/Header";
import EditBookForm from "../../components/Admin/EditBookForm";
import Loading from "../../components/Ui/Loading";
import FeedbackMessage from "../../components/Ui/FeedbackMessage";
import { fetchBookById, updateBook } from "../../api/booksApi";
import { clearAuthToken, getAuthToken } from "../../utils/auth";
import { buildBookPayload, createEmptyBookForm } from "../../utils/bookForm";
import { ui } from "../../styles/ui";

export default function EditBookPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookForm, setBookForm] = useState(createEmptyBookForm());
  const [bookImageFile, setBookImageFile] = useState(null);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("notice");

  useEffect(() => {
    async function loadBook() {
      try {
        const book = await fetchBookById(id);
        setBookForm(createEmptyBookForm(book));
      } catch (err) {
        setType("error");
        setMessage(`Failed to load book: ${err.message}`);
      } finally {
        setInitialLoading(false);
      }
    }

    loadBook();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    if (!bookForm.title.trim() || !bookForm.author.trim()) {
      setType("error");
      setMessage("Title and Author is required!");
      return;
    }

    try {
      setLoading(true);

      // Only switch to FormData (and include the file) when the admin
      // actually picked a new image — otherwise keep the lighter JSON
      // payload so the existing DB image is left untouched.
      let payload;

      if (bookImageFile) {
        const fields = buildBookPayload(bookForm);
        payload = new FormData();
        Object.entries(fields).forEach(([key, value]) => {
          payload.append(key, value);
        });
        payload.append("bookImage", bookImageFile);
      } else {
        payload = buildBookPayload(bookForm);
      }

      await updateBook(id, payload, getAuthToken());

      setMessage("Book updated successfully.");
      setType("success");

      setTimeout(() => {
        setMessage("");
      }, 3000);

      navigate("/admin/books", { replace: true });
    } catch (err) {
      if (err.message === "UNAUTHORIZED") {
        clearAuthToken();
        navigate("/login", { replace: true });
        return;
      }

      setMessage(`Failed to update book: ${err.message}`);
      setType("error");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    navigate("/admin/books", { replace: true });
  }

  return (
    <main className={ui.page}>
      <Header logoutRedirectTo="/login" />

      <div className={ui.pageTopSpace}>
        <div className={ui.container}>
          <div className="flex flex-col gap-6">
            {initialLoading ? (
              <Loading />
            ) : (
              <EditBookForm
                bookForm={bookForm}
                setBookForm={setBookForm}
                bookImageFile={bookImageFile}
                setBookImageFile={setBookImageFile}
                fileInputKey={fileInputKey}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
              />
            )}

            {loading && <Loading />}

            <FeedbackMessage message={message} type={type} />
          </div>
        </div>
      </div>
    </main>
  );
}
