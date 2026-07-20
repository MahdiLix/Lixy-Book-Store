import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Layout/Header";
import BooksTable from "../../components/Books/BooksTable";
import Loading from "../../components/Ui/Loading";
import FeedbackMessage from "../../components/Ui/FeedbackMessage";
import { deleteBook, fetchBooks } from "../../api/booksApi";
import { clearAuthToken, getAuthToken } from "../../utils/auth";
import { ui } from "../../styles/ui";

export default function AdminBooksPage() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("notice");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadBooks();
  }, []);

  async function loadBooks({
    searchTerm = "",
    page = 1,
    limit = 10,
    latest = false,
  } = {}) {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetchBooks({
        searchTerm,
        page,
        limit,
        latest,
      });

      setBooks(res.books || []);
    } catch (err) {
      setType("error");
      setMessage(`Failed to load books: ${err.message}`);

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  }

  // Passing onSearch makes the shared Header run THIS page's search
  // instead of its default behavior (navigating to /search). Header stays
  // reusable — every page just decides what its own onSearch should do.
  async function handleHeaderSearch(e) {
    e.preventDefault();

    await loadBooks({
      searchTerm: searchTerm.trim(),
      page: 1,
      limit: 10,
      latest: false,
    });
  }

  async function handleRemove(bookId) {
    const ok = window.confirm("Remove this book?");
    if (!ok) return;

    try {
      setLoading(true);
      await deleteBook(bookId, getAuthToken());

      setBooks((prev) => prev.filter((book) => book._id !== bookId));
      setType("success");
      setMessage("Book removed successfully.");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (err) {
      if (err.message === "UNAUTHORIZED") {
        clearAuthToken();
        navigate("/login", { replace: true });
        return;
      }

      setType("error");
      setMessage(`Failed to remove book: ${err.message}`);

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(bookId) {
    navigate(`/admin/edit/${bookId}`);
  }

  return (
    <main className={ui.page}>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleHeaderSearch}
        searchPlaceholder="Search books to manage..."
        logoutRedirectTo="/login"
      />

      <div className={ui.pageTopSpace}>
        <div className={ui.container}>
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h1 className={ui.sectionTitle}>Admin Dashboard</h1>

              <Link to="/admin/add" className={ui.primaryBtn}>
                + Add New Book
              </Link>
            </div>

            {loading && <Loading />}

            {!loading && (
              <div className={`${ui.rowWrap} relative z-10`}>
                <div className="w-full">
                  <BooksTable
                    books={books}
                    showActions={true}
                    onEdit={handleEdit}
                    onRemove={handleRemove}
                  />
                </div>
              </div>
            )}

            <FeedbackMessage message={message} type={type} />
          </div>
        </div>
      </div>
    </main>
  );
}
