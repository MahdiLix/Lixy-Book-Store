import BookCover from "./BookCover";
import { ui } from "../../styles/ui";

function formatPrice(value) {
  if (value === null || value === undefined) return null;
  return new Intl.NumberFormat("en-US").format(value);
}

export default function BookCard({ book, onSelect }) {
  const {
    title,
    author,
    bookImage,
    availableCopies,
    price,
    originalPrice,
    discountPercent,
    rating,
  } = book;

  const hasDiscount =
    discountPercent != null && originalPrice != null && price != null;
  const inStock = (availableCopies ?? 0) > 0;

  return (
    <article
      className={ui.bookCard}
      onClick={onSelect ? () => onSelect(book) : undefined}
      role={onSelect ? "button" : undefined}
    >
      {hasDiscount && (
        <span className={ui.bookCardBadge}>%{discountPercent}</span>
      )}

      <div className={ui.bookCardCoverWrap}>
        <BookCover image={bookImage} title={title} size="lg" />
      </div>

      <h3 className={ui.bookCardTitle} title={title}>
        {title || "Untitled"}
      </h3>
      {author && <p className={ui.bookCardSub}>{author}</p>}

      {rating != null && (
        <div className={ui.bookCardMetaRow}>
          <span className={ui.bookCardRating}>
            ★ {Number(rating).toFixed(1)}
          </span>
        </div>
      )}

      <div className={ui.bookCardFooter}>
        <div className={ui.bookCardPriceWrap}>
          {hasDiscount && (
            <span className={ui.bookCardOldPrice}>
              {formatPrice(originalPrice)}
            </span>
          )}
          {price != null && (
            <span className={ui.bookCardPrice}>{formatPrice(price)}</span>
          )}
        </div>

        {hasDiscount && (
          <span className={ui.bookCardDiscountPill}>
            -{discountPercent}%
          </span>
        )}
      </div>

      <span className={inStock ? ui.bookCardStock : ui.bookCardOutOfStock}>
        {inStock ? `${availableCopies} in stock` : "Out of stock"}
      </span>
    </article>
  );
}