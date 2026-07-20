import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Layout/Header";
import GenreBar from "../components/Home/GenreBar";
import CategorySidebar from "../components/Home/CategorySidebar";
import BooksGrid from "../components/Books/BooksGrid";
import Loading from "../components/Ui/Loading";
import FeedbackMessage from "../components/Ui/FeedbackMessage";
import { fetchBooks } from "../api/booksApi";
import { ui } from "../styles/ui";

export default function BooksSearchPage() {
  const [params, setParams] = useSearchParams();
  const urlSearchTerm = params.get("search") || "";

  const [searchTerm, setSearchTerm] = useState(urlSearchTerm);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [activeGenre, setActiveGenre] = useState("");

  useEffect(() => {
    if (urlSearchTerm) {
      setSearchTerm(urlSearchTerm);
      loadResults(urlSearchTerm);
    }
  }, [urlSearchTerm]);

  async function loadResults(term) {
    setError("");
    setLoading(true);

    try {
      const res = await fetchBooks({ searchTerm: term, limit: 40 });
      setBooks(res.books || []);
    } catch (err) {
      setError(`Failed to load search results: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  function handleHeaderSearch(e) {
    e.preventDefault();
    setParams({ search: searchTerm.trim() });
  }

  // Genre bar and Category send selected genre to this function and handle hear
  async function handleGenreSelect(genre) {
    setActiveGenre(genre);
    setSearchTerm("");
    setParams({});
    setError("");
    setLoading(true);

    try {
      const res = await fetchBooks({
        genre,
        limit: 40,
      });
      setBooks(res.books || []);
    } catch (err) {
      setError(`Failed to load "${genre}" books: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={ui.page}>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleHeaderSearch}
      />

      <div className={ui.pageTopSpace}>
        <GenreBar onSelectGenre={handleGenreSelect} activeGenre={activeGenre} />

        <div className={`${ui.homeContainer} py-8`}>
          <div className={ui.searchPageLayout}>
            <CategorySidebar
              onSelectGenre={handleGenreSelect}
              selectedGenre={activeGenre}
            />

            <div className="flex-1">
              <h2 className={ui.searchResultsHeading}>
                {urlSearchTerm
                  ? `Results for "${urlSearchTerm}"`
                  : activeGenre
                    ? `Genre: ${activeGenre}`
                    : "All Books"}
              </h2>

              {loading && <Loading />}

              {!loading && <BooksGrid books={books} />}

              <FeedbackMessage message={error} type="error" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
