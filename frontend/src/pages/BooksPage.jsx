import { useEffect, useRef, useState } from "react";
import Header from "../components/Layout/Header";
import BooksGrid from "../components/Books/BooksGrid";
import Loading from "../components/Ui/Loading";
import FeedbackMessage from "../components/Ui/FeedbackMessage";
import { fetchBooks } from "../api/booksApi";
import { ui } from "../styles/ui";
import Footer from "../components/Layout/Footer";
import GenreBar from "../components/Home/GenreBar";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeGenre, setActiveGenre] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isMounted = useRef(true);
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    loadBooks();
  }, []);

  async function loadBooks({
    searchTerm = "",
    page = 1,
    limit = 40,
    latest = false,
  } = {}) {
    if (!isMounted.current) return;
    setError("");
    setLoading(true);

    try {
      const res = await fetchBooks({ searchTerm, page, limit, latest });
      if (isMounted.current) {
        setBooks(res.books || []);
      }
    } catch (err) {
      if (isMounted.current) {
        setError(`Failed to load books: ${err.message}`);
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }

  async function handleSearch(e) {
    e.preventDefault();
    setActiveGenre("");
    await loadBooks({
      searchTerm: searchTerm.trim(),
      page: 1,
      limit: 40,
      latest: false,
    });
  }

  async function handleGenreSelect(genre) {
    if (!isMounted.current) return;
    setActiveGenre(genre);
    setSearchTerm("");
    setError("");
    setLoading(true);

    try {
      const res = await fetchBooks({ genre, limit: 40 });
      if (isMounted.current) {
        setBooks(res.books || []);
      }
    } catch (err) {
      if (isMounted.current) {
        setError(`Failed to load "${genre}" books: ${err.message}`);
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }

  return (
    <main className={ui.page}>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
      />

      <div className={ui.pageTopSpace}>
        <div className="pb-10">
          <GenreBar
            onSelectGenre={handleGenreSelect}
            activeGenre={activeGenre}
          />
        </div>

        <div className={ui.container}>
          <div className="flex flex-col gap-6 pb-10">
            {loading && <Loading />}

            {!loading && books.length === 0 && !error && (
              <div className={ui.notice}>
                No books found. Try a different search or genre!
              </div>
            )}

            {!loading && books.length > 0 && (
              <div className="relative z-10">
                <BooksGrid books={books} />
              </div>
            )}

            <FeedbackMessage message={error} type="error" />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
