import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import Header from "../components/Header";
import BookCover from "../components/Books/BookCover";
import PriceTag from "../components/Books/PriceTag"; // Reusable Component
import Loading from "../components/Shared/Loading";
import FeedbackMessage from "../components/Shared/FeedbackMessage";
import { fetchBookById } from "../api/booksApi";
import { useCart } from "../context/CartContext";
import { ui } from "../styles/ui";

export default function BookDetailPage() {
  const { id } = useParams();
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();
  
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadBook() {
      setLoading(true);
      setError("");
      try {
        const data = await fetchBookById(id);
        setBook(data);
      } catch (err) {
        setError(`Failed to load book: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
    loadBook();
  }, [id]);

  const getBookId = (b) => b?._id ?? b?.id;
  const currentBookId = book ? getBookId(book) : null;

  const cartItem = cart.find((item) => getBookId(item.book) === currentBookId);
  const quantityInCart = cartItem?.quantity || 0;
  const inStock = (book?.stockQuantity ?? 0) > 0;

  function handleAddToCart() {
    if (!book || !inStock) return;
    addToCart(book, 1);
  }

  function handleIncrement() {
    updateQuantity(currentBookId, quantityInCart + 1);
  }

  function handleDecrement() {
    updateQuantity(currentBookId, quantityInCart - 1);
  }

  function handleRemove() {
    removeFromCart(currentBookId);
  }

  return (
    <main className={ui.page}>
      <Header />

      <div className={ui.pageTopSpace}>
        <div className={`${ui.homeContainer} py-8`}>
          {loading && <Loading />}

          {!loading && book && (
            <>
              <div className={ui.detailLayout}>
                <div className={ui.detailCoverWrap}>
                  <BookCover image={book.bookImage} title={book.title} size="xl" />
                </div>

                <div className={ui.detailInfoList}>
                  <p className={ui.detailInfoRow}>
                    <span className={ui.detailInfoLabel}>Title :</span>{" "}
                    {book.title || "—"}
                  </p>
                  <p className={ui.detailInfoRow}>
                    <span className={ui.detailInfoLabel}>Author :</span>{" "}
                    {book.author || "—"}
                  </p>
                  <p className={ui.detailInfoRow}>
                    <span className={ui.detailInfoLabel}>Genre :</span>{" "}
                    {book.genre || "—"}
                  </p>
                  <p className={ui.detailInfoRow}>
                    <span className={ui.detailInfoLabel}>Published year :</span>{" "}
                    {book.publishedYear || "—"}
                  </p>
                  <p className={ui.detailInfoRow}>
                    <span className={ui.detailInfoLabel}>Stock :</span>{" "}
                    {inStock ? "available" : "Out of stock"}
                  </p>

                  {/* Reusable Price Component */}
                  <div className="mt-4">
                    <PriceTag book={book} size="lg" />
                  </div>

                  {/* Cart Controls */}
                  <div className="mt-4">
                    {quantityInCart > 0 ? (
                      <div className={ui.detailCartControls}>
                        <button
                          type="button"
                          onClick={handleDecrement}
                          className={ui.cartQtyBtn}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={18} />
                        </button>
                        <span className={ui.cartQtyValue}>{quantityInCart}</span>
                        <button
                          type="button"
                          onClick={handleIncrement}
                          className={ui.cartQtyBtn}
                          aria-label="Increase quantity"
                        >
                          <Plus size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={handleRemove}
                          className={ui.detailRemoveBtn}
                          aria-label="Remove from cart"
                        >
                          <Trash2 size={18} />
                        </button>
                        
                        {/* Redirect button to Cart Page */}
                        <Link to="/cart" className={`${ui.primaryBtn} flex-1`}>
                          Shopping cart
                        </Link>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={handleAddToCart}
                        disabled={!inStock}
                        className={ui.addToCartBtn}
                      >
                        <ShoppingCart size={18} /> Add to cart
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <h2 className={ui.detailSectionHeading}>Description Book :</h2>
              <p className={ui.detailIntroText}>
                {book.description || "No description available for this book."}
              </p>
            </>
          )}

          <FeedbackMessage message={error} type="error" />
        </div>
      </div>
    </main>
  );
}