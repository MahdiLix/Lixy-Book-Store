import { useNavigate } from "react-router-dom";
import BookCover from "./BookCover";
import { ui } from "../../styles/ui";

function formatPrice(value) {
  if (value === null || value === undefined) return null;
  return new Intl.NumberFormat("en-US").format(value);
}

export default function BookCard({ book, onSelect }) {
  const navigate = useNavigate();

  const {
    _id,
    title,
    author,
    bookImage,
    inStock,
    stockQuantity,
    price,
    discountedPrice,
    discount,
    viewRate,
  } = book;

  const hasDiscount = discount > 0 && discountedPrice != null;

  function handleClick() {
    if (onSelect) {
      onSelect(book);
      return;
    }
    navigate(`/books/${_id}`);
  }

  return (
    <article className={ui.bookCard} onClick={handleClick} role="button">
      {hasDiscount && <span className={ui.bookCardBadge}>%{discount}</span>}

      <div className={ui.bookCardCoverWrap}>
        <BookCover image={bookImage} title={title} size="lg" />
      </div>

      <h3 className={ui.bookCardTitle} title={title}>
        {title || "Untitled"}
      </h3>
      {author && <p className={ui.bookCardSub}>{author}</p>}

      <div className={ui.bookCardFooter}>
        <div className={ui.bookCardPriceWrap}>
          {hasDiscount && (
            <span className={ui.bookCardOldPrice}>{formatPrice(price)}</span>
          )}

          <span className={ui.bookCardPrice}>
            {formatPrice(hasDiscount ? discountedPrice : price) + '$'}
          </span>
        </div>

        {hasDiscount && (
          <span className={ui.bookCardDiscountPill}>-{discount}%</span>
        )}
      </div>

      <span className={inStock ? ui.bookCardStock : ui.bookCardOutOfStock}>
        {inStock ? `in stock` : "Out of stock"}
      </span>
    </article>
  );
}
