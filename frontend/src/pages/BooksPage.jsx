import { useEffect, useState } from "react";
import SearchBookForm from "../components/Books/SearchBookForm";
import BooksTable from "../components/Books/BooksTable";
import ErrorMessage from "../components/Shared/ErrorMessage";
import Loading from "../components/Shared/Loading";
import { fetchBooks } from "../api/booksApi";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    await loadBooks(searchTerm.trim());
  }

  return (
    <main id="mainContainer">
      <h2>Welcome to Lixy Book Store</h2>

      <SearchBookForm
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
      />

      {loading && <Loading />}

      {!loading && <BooksTable books={books} />}

      <ErrorMessage message={error} />
    </main>
  );
}