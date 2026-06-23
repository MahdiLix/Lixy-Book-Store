import { useEffect, useState } from "react";
import Header from "../components/Header";
import SearchBookForm from "../components/Books/SearchBookForm";
import BooksTable from "../components/Books/BooksTable";
import Loading from "../components/Shared/Loading";
import FeedbackMessage from "../components/Shared/FeedbackMessage";
import { fetchBooks } from "../api/booksApi";
import { ui } from "../styles/ui";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    loadBooks();
  }, []);

  async function loadBooks({
    searchTerm = "",
    page = 1,
    limit = 10,
    latest = false,
  } = {}) {
    setError("");
    setLoading(true);

    try {
      const res = await fetchBooks({
        searchTerm,
        page,
        limit,
        latest,
      });

      setBooks(res.books || []);
    } catch (err) {
      setError(`Failed to load books: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(e) {
    e.preventDefault();
    setSearchFocused(false);

    await loadBooks({
      searchTerm: searchTerm.trim(),
      page: 1,
      limit: 10,
      latest: false,
    });
  }

  return (
    <main className={ui.page}>
      <Header subtitle="Browse and search books" logoutRedirectTo="/books" />

      <div className={ui.pageTopSpace}>
        <div className={ui.container}>
          <div className="flex flex-col gap-6">
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

            {searchFocused && <div className={ui.overlay} />}

            {loading && <Loading />}

            {!loading && (
              <div className={`${ui.rowWrap} relative z-10`}>
                <div className="w-full">
                  <BooksTable books={books} />
                </div>
              </div>
            )}

            <FeedbackMessage message={error} type="error" />
          </div>
        </div>
      </div>
    </main>
  );
}