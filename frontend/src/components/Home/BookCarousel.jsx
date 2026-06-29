import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BookCard from "../Books/BookCard";
import { ui } from "../../styles/ui";

export default function BookCarousel({ title, books = [], viewAllHref }) {
  const trackRef = useRef(null);

  function scrollBy(amount) {
    trackRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  }

  if (!books.length) return null;

  return (
    <section className={ui.carouselSection}>
      <div className={ui.carouselHeadingRow}>
        {title && <h2 className={ui.carouselHeading}>{title}</h2>}

        {viewAllHref && (
          <a href={viewAllHref} className={ui.carouselViewAll}>
            View all
            <ChevronRight size={16} />
          </a>
        )}
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => scrollBy(-700)}
          className={`${ui.carouselArrowBtn} -left-5`}
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} />
        </button>

        <div ref={trackRef} className={ui.carouselTrack}>
          {books.map((book) => (
            <div key={book._id} className={ui.carouselItem}>
              <BookCard book={book} />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollBy(700)}
          className={`${ui.carouselArrowBtn} -right-5`}
          aria-label="Scroll right"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}