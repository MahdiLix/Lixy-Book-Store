import { useEffect, useRef, useState } from "react";
import Header from "../components/Layout/Header";
import BooksGrid from "../components/Books/BooksGrid";
import Loading from "../components/ui/Loading";
import FeedbackMessage from "../components/ui/FeedbackMessage";
import Pagination from "../components/ui/Pagination"; 
import { fetchBooks } from "../api/booksApi";
import { ui } from "../styles/ui";
import Footer from "../components/Layout/Footer";
import GenreBar from "../components/Home/GenreBar";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [pagination, setPagination] = useState(null); 
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
    loadBooks(1); // Load first page on mount
  }, []);

  async function loadBooks(
    page = 1,
    currentSearch = searchTerm,
    currentGenre = activeGenre,
  ) {
    if (!isMounted.current) return;
    setError("");
    setLoading(true);

    try {
      const res = await fetchBooks({
        searchTerm: currentSearch.trim(),
        genre: currentGenre,
        page,
        limit: 12,
        latest: false,
      });

      if (isMounted.current) {
        setBooks(res.books || []);
        setPagination(res.pagination);
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
    await loadBooks(1, searchTerm, ""); // Reset to page 1 on new search
  }

  async function handleGenreSelect(genre) {
    if (!isMounted.current) return;
    setActiveGenre(genre);
    setSearchTerm("");
    await loadBooks(1, "", genre); // Reset to page 1 on new genre
  }

  async function handlePageChange(page) {
    await loadBooks(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
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

                <Pagination
                  pagination={pagination}
                  onPageChange={handlePageChange}
                />
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
