import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BookCard from "../Books/BookCard";
import { ui } from "../../styles/ui";

export default function BookCarousel({ title, books = [], viewAllHref }) {
  const trackRef = useRef(null);

  // FIXED: Dynamic scroll amount based on actual track width
  function handleScroll(direction) {
    const track = trackRef.current;
    if (!track) return;

    // Scroll by roughly 80% of the visible track width.
    // This ensures it scrolls smoothly without jumping too many books on mobile.
    const scrollAmount = track.clientWidth * 0.8 * direction;
    
    track.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
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
          onClick={() => handleScroll(-1)} // Pass -1 for left
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
          onClick={() => handleScroll(1)} // Pass 1 for right
          className={`${ui.carouselArrowBtn} -right-5`}
          aria-label="Scroll right"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}