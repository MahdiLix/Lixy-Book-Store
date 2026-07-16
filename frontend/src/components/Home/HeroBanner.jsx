import { useNavigate } from "react-router-dom";
import BookCover from "../Books/BookCover";
import { ui } from "../../styles/ui";

const BANNER_COLORS = ["bg-[#3d5a6c]", "bg-[#5a4a8c]", "bg-[#7c3b54]"];

export default function HeroBanner({ books = [] }) {
  const navigate = useNavigate();

  if (!books.length) return null;

  return (
    <section className={ui.heroGrid}>
      {books.map((book, i) => (
        <article
          key={book._id || i}
          className={`${ui.heroCard} ${BANNER_COLORS[i % BANNER_COLORS.length]}`}
        >
          <div className={ui.heroCardImgWrap}>
            {/* if you need API_BASE_URL logic you can use BookCover*/}
            <img
              src={book.bookImage}
              alt={book.title}
              className={ui.heroCardImg}
            />
          </div>

          <div className={ui.heroCardBody}>
            <h3 className={ui.heroCardTitle}>{book.title}</h3>

            <p className={ui.heroCardDesc}>
              {book.description ||
                `Discover "${book.title}" by ${book.author}. A top pick for ${book.genre} lovers.`}
            </p>

            <p className={ui.heroCardTag}>{book.genre}</p>

            <button
              type="button"
              onClick={() => navigate(`/books/${book._id}`)}
              className={ui.heroCardBtn}
            >
              Now Read!
            </button>
          </div>
        </article>
      ))}
    </section>
  );
}
