import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Layout/Header";
import GenreBar from "../components/Home/GenreBar";
import CategorySidebar from "../components/Home/CategorySidebar";
import BooksGrid from "../components/Books/BooksGrid";
import Pagination from "../components/Ui/Pagination";
import Loading from "../components/Ui/Loading";
import FeedbackMessage from "../components/Ui/FeedbackMessage";
import { fetchBooks } from "../api/booksApi";
import { ui } from "../styles/ui";
import Footer from "../components/Layout/Footer";

export default function BooksSearchPage() {
  const [params, setParams] = useSearchParams();
  const urlSearchTerm = params.get("search") || "";
  const urlGenre = params.get("genre") || "";

  const [searchTerm, setSearchTerm] = useState(urlSearchTerm);
  const [books, setBooks] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeGenre, setActiveGenre] = useState("");

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (urlSearchTerm) {
      setSearchTerm(urlSearchTerm);
      loadResults(urlSearchTerm);
    } else if (urlGenre) {
      handleGenreSelect(urlGenre);
    }
  }, [urlSearchTerm, urlGenre]);

  //  auto‑load Fiction on first visit
  useEffect(() => {
    if (!urlSearchTerm && !urlGenre) {
      handleGenreSelect("Fiction");
    }
  }, []);

  async function loadResults(term, page = 1) {
    setError("");
    setLoading(true);

    try {
      const res = await fetchBooks({ searchTerm: term, limit: 12, page });
      if (isMounted.current) {
        setBooks(res.books || []);
        setPagination(res.pagination);
      }
    } catch (err) {
      if (isMounted.current) {
        setError(`Failed to load search results: ${err.message}`);
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }

  function handleHeaderSearch(e) {
    e.preventDefault();
    setParams({ search: searchTerm.trim() });
  }

  async function handleGenreSelect(genre, page = 1) {
    setActiveGenre(genre);
    setSearchTerm("");
    setParams({}); // set genre in URL params
    setError("");
    setLoading(true);

    try {
      const res = await fetchBooks({ genre, limit: 12, page });
      if (isMounted.current) {
        setBooks(res.books || []);
        setPagination(res.pagination);
      }

      console.log("genre books", res.books);
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

  async function handlePageChange(page) {
    if (urlSearchTerm) {
      await loadResults(urlSearchTerm, page);
    } else if (activeGenre) {
      await handleGenreSelect(activeGenre, page);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
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

              <Pagination
                pagination={pagination}
                onPageChange={handlePageChange}
              />

              <FeedbackMessage message={error} type="error" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
