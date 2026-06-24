import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../components/Admin/AdminHeader";
import AdminToolbar from "../../components/Admin/AdminToolbar";
import AddBookForm from "../../components/Admin/AddBookForm";
import SearchBookForm from "../../components/Books/SearchBookForm";
import BooksTable from "../../components/Books/BooksTable";
import Loading from "../../components/Shared/Loading";
import FeedbackMessage from "../../components/Shared/FeedbackMessage";
import { addBook, deleteBook, fetchBooks } from "../../api/booksApi";
import { clearAuthToken, getAuthToken } from "../../utils/auth";
import { createEmptyBookForm } from "../../utils/bookForm";
import { ui } from "../../styles/ui";

export default function AdminBooksPage() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activePanel, setActivePanel] = useState("search");
  const [searchFocused, setSearchFocused] = useState(false);
  const [bookForm, setBookForm] = useState(createEmptyBookForm());
  const [bookImageFile, setBookImageFile] = useState(null);
  const [fileInputKey, setFileInputKey] = useState(0);
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

  async function handleSearch(e) {
    e.preventDefault();
    setSearchFocused(false);
    setActivePanel("search");

    await loadBooks({
      searchTerm: searchTerm.trim(),
      page: 1,
      limit: 10,
      latest: false,
    });
  }

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

      if (bookForm.availableCopies !== "") {
        formData.append("availableCopies", bookForm.availableCopies);
      }

      formData.append("bookImage", bookImageFile);

      const data = await addBook(formData, getAuthToken());

      if (data.data) {
        setBooks((prev) => [data.data, ...prev]);
      }

      setBookForm(createEmptyBookForm());
      setBookImageFile(null);
      setFileInputKey((prev) => prev + 1);
      setActivePanel("search");

      setType("success");
      setMessage("Book added successfully.");

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
      setMessage(`Failed to add book: ${err.message}`);

      setTimeout(() => {
        setMessage("");
      }, 3000);
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
      <AdminHeader subtitle="Admin Dashboard" />

      <div className={ui.pageTopSpace}>
        <div className={ui.container}>
          <div className="flex flex-col gap-6">
            <AdminToolbar
              activePanel={activePanel}
              onShowSearch={() => {
                setSearchFocused(false);
                setActivePanel("search");
              }}
              onShowAdd={() => {
                setSearchFocused(false);
                setActivePanel("add");
              }}
            />

            {activePanel === "search" && (
              <section className={`${ui.card} relative z-30`}>
                <div className={`${ui.cardBody} flex justify-center`}>
                  <SearchBookForm
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onSearch={handleSearch}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                  />
                </div>
              </section>
            )}

            {activePanel === "add" && (
              <AddBookForm
                bookForm={bookForm}
                setBookForm={setBookForm}
                bookImageFile={bookImageFile}
                setBookImageFile={setBookImageFile}
                fileInputKey={fileInputKey}
                onSubmit={handleAddBook}
                onCancel={() => {
                  setBookForm(createEmptyBookForm());
                  setBookImageFile(null);
                  setFileInputKey((prev) => prev + 1);
                  setActivePanel("search");
                }}
              />
            )}

            {searchFocused && <div className={ui.overlay} />}

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