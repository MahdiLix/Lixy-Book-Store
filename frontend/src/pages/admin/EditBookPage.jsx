import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditBookForm from "../../components/Admin/EditBook/EditBookForm";
import ErrorMessage from "../../components/Shared/ErrorMessage";
import Loading from "../../components/Shared/Loading";
import { fetchBookById, updateBook } from "../../api/booksApi";
import { clearAuthToken, getAuthToken } from "../../utils/auth";
import { buildBookPayload, createEmptyBookForm } from "../../utils/bookForm";



export default function EditBookPage() {
  const { id } = useParams();
  const navigate = useNavigate();
 
  const [bookForm, setBookForm] = useState(createEmptyBookForm());
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    async function loadBook() {
      try {
        const book = await fetchBookById(id);
        setBookForm(createEmptyBookForm(book));

      } catch (err) {
        setError(`Failed to load book: ${err.message}`);
      } finally {
        setInitialLoading(false);
      }
    }

    loadBook();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!bookForm.title.trim() || !bookForm.author.trim()) {
      setError("Title and Author is required!");
      return;
    }

    const payload = buildBookPayload(bookForm);

    try {
      setLoading(true);
      await updateBook(id, payload, getAuthToken());
      navigate("/admin/books", { replace: true });

    } catch (err) {
      if (err.message === "UNAUTHORIZED") {
        clearAuthToken();
        navigate("/login", { replace: true });
        return;
      }

      setError(`Error update book: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    navigate("/admin/books", { replace: true });
  }

  if (initialLoading) {
    return <Loading />;
  }

  return (
    <main>
      <EditBookForm
        bookForm={bookForm}
        setBookForm={setBookForm}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />

      {loading && <Loading />}
      <ErrorMessage message={error} />
    </main>
  );
}