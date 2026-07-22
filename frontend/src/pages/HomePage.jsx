import { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import GenreBar from "../components/Home/GenreBar";
import HeroBanner from "../components/Home/HeroBanner";
import PromoBanner from "../components/Home/PromoBanner";
import BookCarousel from "../components/Home/BookCarousel";
import Loading from "../components/Ui/Loading";
import FeedbackMessage from "../components/Ui/FeedbackMessage";
import { fetchBooks } from "../api/booksApi";
import promoBannerImage from "../assets/images/promo_banner_1.png";
import { ui } from "../styles/ui";
import Footer from "../components/Layout/Footer";

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [topBooks, setTopBooks] = useState([]);
  const [mustOfferBooks, setMustOfferBooks] = useState([]);
  const [genreBooks, setGenreBooks] = useState([]);
  const [heroBooks, setHeroBooks] = useState([]);
  const [activeGenre, setActiveGenre] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadInitial();
  }, []);

  async function loadInitial() {
    setError("");
    setLoading(true);

    try {
      const top = await fetchBooks({ top: true, limit: 12 });
      setHeroBooks([...top.books.filter((_g, i) => i < 3)] || []); // prevent search again for top

      const mustOffer = await fetchBooks({
        mustOffer: true,
        limit: 12,
        latest: true,
      });

      // Check if activeGenre is empty or default "Genres", then auto-search "Fiction"
      const isDefaultGenre =
        !activeGenre || activeGenre === "" || activeGenre === "Genres";
      const selectedGenre = "Fiction";

      setTopBooks(top.books || []);
      setMustOfferBooks(mustOffer.books || []);

      await handleGenreSelect(selectedGenre);
    } catch (err) {
      setError(`Failed to load books: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleGenreSelect(genre) {
    setActiveGenre(genre);
    setError("");
    setLoading(true);

    try {
      const res = await fetchBooks({ genre, limit: 12 });
      setGenreBooks(res.books || []);
    } catch (err) {
      setError(`Failed to load "${genre}" books: ${err.message}`);
      setGenreBooks([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={ui.page}>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className={ui.pageTopSpace}>
        <GenreBar onSelectGenre={handleGenreSelect} activeGenre={activeGenre} />

        <div className={`${ui.homeContainer} flex flex-col gap-10 py-8`}>
          <HeroBanner books={heroBooks} />

          <PromoBanner
            image={promoBannerImage}
            // title="This Week's Pick"
            // subtitle="Hand-picked stories our readers can't put down."
          />

          {loading && <Loading />}

          {!loading && (
            <div className="flex flex-col gap-10">
              <BookCarousel
                title={`Top Books — ${activeGenre}`}
                books={genreBooks}
                viewAllHref="/books"
              />
              <BookCarousel
                title="Top Books"
                books={topBooks}
                viewAllHref="/books"
              />
              <BookCarousel
                title="Must Offer"
                books={mustOfferBooks}
                viewAllHref="/books"
              />
            </div>
          )}

          <FeedbackMessage message={error} type="error" />
        </div>
      </div>
      <Footer />
    </main>
  );
}
