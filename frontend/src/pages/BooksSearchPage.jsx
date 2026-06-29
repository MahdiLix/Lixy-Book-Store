import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import GenreBar from "../components/Home/GenreBar";
import CategorySidebar from "../components/Home/CategorySidebar";
import BooksGrid from "../components/Books/BooksGrid";
import Loading from "../components/Shared/Loading";
import FeedbackMessage from "../components/Shared/FeedbackMessage";
import { fetchBooks } from "../api/booksApi";
import { ui } from "../styles/ui";



export default function BooksSearchPage() {
  const [params, setParams] = useSearchParams();
  const urlSearchTerm = params.get("search") || "";

  const [searchTerm, setSearchTerm] = useState(urlSearchTerm);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Re-run whenever the URL's ?search= changes (e.g. user searches again
  // from the Header while already on this page).
  useEffect(() => {
    setSearchTerm(urlSearchTerm);
    loadResults(urlSearchTerm);
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

  return (
    <main className={ui.page}>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleHeaderSearch}
      />

      <div className={ui.pageTopSpace}>
        <GenreBar />

        <div className={`${ui.homeContainer} py-8`}>
          <div className={ui.searchPageLayout}>
            <CategorySidebar />

            <div className="flex-1">
              <h2 className={ui.searchResultsHeading}>
                {urlSearchTerm
                  ? `Results for "${urlSearchTerm}"`
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