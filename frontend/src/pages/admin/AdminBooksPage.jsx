import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../components/Admin/AdminHeader";
import AdminToolbar from "../../components/Admin/AdminToolbar";
import AddBookForm from "../../components/Admin/AddBookForm";
import SearchBookForm from "../../components/Books/SearchBookForm";
import BooksTable from "../../components/Books/BooksTable";
import ErrorMessage from "../../components/Shared/ErrorMessage";
import Loading from "../../components/Shared/Loading";
import { addBook, deleteBook, fetchBooks } from "../../api/booksApi";
import { clearAuthToken, getAuthToken } from "../../utils/auth";
import { buildBookPayload, createEmptyBookForm } from "../../utils/bookForm";



export default function AdminBooksPage() {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activePanel, setActivePanel] = useState("search"); // search || add
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [bookForm, setBookForm] = useState(createEmptyBookForm());

  useEffect(() => {
    loadBooks("");
  }, []);

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
    setActivePanel("search");
    await loadBooks(searchTerm.trim());
  }

  function handleShowSearch() {
    setActivePanel("search");
  }

  function handleShowAdd() {
    setActivePanel("add");
    setError("");
  }

  function handleCancelAddForm() {
    setActivePanel("search");
    setBookForm(createEmptyBookForm());
  }

  async function handleAddBook(e) {
    e.preventDefault();
    setError("");

    if (!bookForm.title.trim() || !bookForm.author.trim()) {
      setError("Title and Author is required!");
      return;
    }

    const payload = buildBookPayload(bookForm);

    try {
      setLoading(true);
      const data = await addBook(payload, getAuthToken());

      console.log('from admin add book page',data.book)
      if (data.book) {
          setBooks((prev)=> [data.book, ...prev]);
      }

      setBookForm(createEmptyBookForm());
      setActivePanel("search");
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

  async function handleRemove(bookId) {
    const ok = window.confirm("Remove this book?");
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

  function handleEdit(bookId) {
    navigate(`/admin/edit/${bookId}`);
  }

  function handleLogout() {
    clearAuthToken();
    navigate("/login", { replace: true });
  }


  return (
    <main id="bookStoreDisplayContainer">
      <AdminHeader onLogout={handleLogout} />

      <AdminToolbar
        activePanel={activePanel}
        onShowSearch={handleShowSearch}
        onShowAdd={handleShowAdd}
      />

      {activePanel === "search" && (
        <SearchBookForm
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
        />
      )}

      {activePanel === "add" && (
        <AddBookForm
          bookForm={bookForm}
          setBookForm={setBookForm}
          onSubmit={handleAddBook}
          onCancel={handleCancelAddForm}
        />
      )}

      {loading && <Loading />}

      {activePanel === "search" && !loading && (
        <BooksTable
          books={books}
          showAdminActions={true}
          onEdit={handleEdit}
          onRemove={handleRemove}
        />
      )}

      <ErrorMessage message={error} />
    </main>
  );
}