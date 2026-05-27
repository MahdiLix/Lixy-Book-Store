import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditBookForm from "../../components/EditBook/EditBookForm";
import ErrorMessage from "../../components/Shared/ErrorMessage";
import Loading from "../../components/Shared/Loading";
import { fetchBookById, updateBook } from "../../api/booksApi";
import { clearAuthToken, getAuthToken } from "../../utils/auth";

export default function EditBookPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bookForm, setBookForm] = useState({
    title: "",
    author: "",
    publishedYear: "",
    genre: "",
    availableCopies: "1",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    async function loadBook() {
      try {
        const book = await fetchBookById(id);

        setBookForm({
          title: book.title || "",
          author: book.author || "",
          publishedYear: book.publishedYear || "",
          genre: book.genre || "",
          availableCopies:
            book.availableCopies !== undefined ? String(book.availableCopies) : "1",
        });
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

    const title = bookForm.title.trim();
    const author = bookForm.author.trim();

    if (!title || !author) {
      setError("Title and Author is required!");
      return;
    }

    const payload = {
      title,
      author,
    };

    if (bookForm.publishedYear.trim()) {
      payload.publishedYear = Number(bookForm.publishedYear);
    }

    if (bookForm.genre) {
      payload.genre = bookForm.genre;
    }

    if (bookForm.availableCopies !== "") {
      payload.availableCopies = Number(bookForm.availableCopies);
    }

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

      <ErrorMessage message={error} />
      {loading && <Loading />}
    </main>
  );
}