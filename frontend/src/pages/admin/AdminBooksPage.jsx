import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../components/Admin/AdminHeader";
import AddBookForm from "../../components/Admin/AddBookForm";
import SearchBookForm from "../../components/Books/SearchBookForm";
import BooksTable from "../../components/Books/BooksTable";
import ErrorMessage from "../../components/Shared/ErrorMessage";
import Loading from "../../components/Shared/Loading";
import { addBook, deleteBook, fetchBooks } from "../../api/booksApi";
import { clearAuthToken, getAuthToken } from "../../utils/auth";

export default function AdminBooksPage() {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [bookForm, setBookForm] = useState({
    title: "",
    author: "",
    publishedYear: "",
    genre: "",
    availableCopies: "1",
  });

  useEffect(() => {
    loadBooks("");
  }, []);

  // convert to conponent
  async function loadBooks(term = "") {
    setError("");
    setLoading(true);

    try {
      const data = await fetchBooks(term);
      setBooks(data);
    } catch (err) {
      setError(`Failed to load books: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(e) {
    e.preventDefault();
    setShowAddForm(false);
    await loadBooks(searchTerm.trim());
  }

  function handleShowAddForm() {
    setShowAddForm(true);
    setError("");
  }

  function handleCancelAddForm() {
    setShowAddForm(false);
    setBookForm({
      title: "",
      author: "",
      publishedYear: "",
      genre: "",
      availableCopies: "1",
    });
  }

  async function handleAddBook(e) {
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
      const data = await addBook(payload, getAuthToken());

      if (data.book) {
        setBooks((prev) => [data.book, ...prev]);
      }

      handleCancelAddForm();
    } catch (err) {
      if (err.message === "UNAUTHORIZED") {
        clearAuthToken();
        navigate("/login", { replace: true });
        return;
      }

      setError(`Error add book: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(bookId) {
    navigate(`/admin/edit/${bookId}`);
  }

  async function handleRemove(bookId) {
    const ok = window.confirm(`Are you sure you want to delete the book ${bookId} ?`);
    if (!ok) return;


    try {
      setLoading(true);
      await deleteBook(bookId, getAuthToken());
      setBooks((prev) => prev.filter((book) => book._id !== bookId));
    } catch (err) {
      if (err.message === "UNAUTHORIZED") {
        clearAuthToken();
        navigate("/login", { replace: true });
        return;
      }

      setError(`Error remove book: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    clearAuthToken();
    navigate("/login", { replace: true });
  }

  return (
    <main id="bookStoreDisplayContainer">
      <AdminHeader onLogout={handleLogout} />

      <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
        <SearchBookForm
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
        />

        <button id="addNewBookBtn" onClick={handleShowAddForm}>
          add new book
        </button>
      </div>

      {showAddForm && (
        <AddBookForm
          bookForm={bookForm}
          setBookForm={setBookForm}
          onSubmit={handleAddBook}
          onCancel={handleCancelAddForm}
        />
      )}

      {loading && <Loading />}

      {!loading && (
        <BooksTable
          books={books}
          showActions={true}
          onEdit={handleEdit}
          onRemove={handleRemove}
        />
      )}

      <ErrorMessage message={error} />
    </main>
  );
}