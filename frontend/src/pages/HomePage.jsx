import { useEffect, useState } from "react";
import Header from "../components/Header";
import GenreBar from "../components/Home/GenreBar";
import HeroBanner from "../components/Home/HeroBanner";
import PromoBanner from "../components/Home/PromoBanner";
import BookCarousel from "../components/Home/BookCarousel";
import Loading from "../components/Shared/Loading";
import FeedbackMessage from "../components/Shared/FeedbackMessage";
import { fetchBooks } from "../api/booksApi";
import { ui } from "../styles/ui";

const HERO_SLIDES = [
  {
    id: "viking",
    title: "Books Head",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa elit lectus enim id euismod. Gravida at praesent aliquam, at natoque at leo. Faucibus quam ipsum magna.",
    tags: "Detective-Love-History",
    image: "/lixystoreblue-logo.png",
    accentColor: "#3d5a6c",
  },
  {
    id: "sherlock-mavi",
    title: "Books Head",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa elit lectus enim id euismod. Gravida at praesent aliquam, at natoque at leo. Faucibus quam ipsum magna.",
    tags: "Detective-ScienceFiction-Fantastic",
    image: "/lixystoreblue-logo.png",
    accentColor: "#5a4a8c",
  },
  {
    id: "sherlock-gumus",
    title: "Books Head",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa elit lectus enim id euismod. Gravida at praesent aliquam, at natoque at leo. Faucibus quam ipsum magna.",
    tags: "Novel-History-Love",
    image: "/lixystoreblue-logo.png",
    accentColor: "#7c3b54",
  },
];

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState(""); // Memory
  const [topBooks, setTopBooks] = useState([]);
  const [mustOfferBooks, setMustOfferBooks] = useState([]);
  const [genreBooks, setGenreBooks] = useState([]);
  const [activeGenre, setActiveGenre] = useState("Fiction");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadInitial();
  }, []);

  async function loadInitial() {
    setError("");
    setLoading(true);

    try {
      const top = await fetchBooks({ limit: 12 });
      const mustOffer = await fetchBooks({ limit: 12, latest: true });

      setTopBooks(top.books || []);
      setMustOfferBooks(mustOffer.books || []);
      setGenreBooks(top.books || []);
    } catch (err) {
      setError(`Failed to load books: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleGenreSelect(genre) {
    setActiveGenre(genre);
    setError("");

    try {
      const res = await fetchBooks({ genre, limit: 12 });
      setGenreBooks(res.books || []);
    } catch (err) {
      setError(`Failed to load "${genre}" books: ${err.message}`);
    }
  }

  return (
    <main className={ui.page}>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className={ui.pageTopSpace}>
        <GenreBar onSelectGenre={handleGenreSelect} />

        <div className={`${ui.homeContainer} flex flex-col gap-10 py-8`}>
          <HeroBanner slides={HERO_SLIDES} />

          <PromoBanner
            image="/lixystoreblue-logo.png"
            title="This Week's Pick"
            subtitle="Hand-picked stories our readers can't put down."
          />

          {loading && <Loading />}

          {!loading && (
            <div className="flex flex-col gap-10">
              <BookCarousel
                title={`Top Books — ${activeGenre}`}
                books={genreBooks}
                viewAllHref="/books"
              />
              <BookCarousel title="Top Books" books={topBooks} viewAllHref="/books" />
              <BookCarousel title="Must Offer" books={mustOfferBooks} viewAllHref="/books" />
            </div>
          )}

          <FeedbackMessage message={error} type="error" />
        </div>
      </div>
    </main>
  );
}