import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminHeader from "../../components/Admin/AdminHeader";
import EditBookForm from "../../components/Admin/EditBook/EditBookForm";
import Loading from "../../components/Shared/Loading";
import FeedbackMessage from "../../components/Shared/FeedbackMessage";
import { fetchBookById, updateBook } from "../../api/booksApi";
import { clearAuthToken, getAuthToken } from "../../utils/auth";
import { buildBookPayload, createEmptyBookForm } from "../../utils/bookForm";
import { ui } from "../../styles/ui";

export default function EditBookPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bookForm, setBookForm] = useState(createEmptyBookForm());
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
      await updateBook(id, buildBookPayload(bookForm), getAuthToken());

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
      });

    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    navigate("/admin/books", { replace: true });
  }

  return (
    <main className={ui.page}>
      <AdminHeader subtitle="Admin Dashboard" />

      <div className={ui.pageTopSpace}>
        <div className={ui.container}>
          <div className="flex flex-col gap-6">
            {initialLoading ? (
              <Loading />
            ) : (
              <EditBookForm
                bookForm={bookForm}
                setBookForm={setBookForm}
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