import { Link } from "react-router-dom";
import { ShoppingCart, Trash2, Minus, Plus } from "lucide-react";
import Header from "../components/Layout/Header";
import BookCover from "../components/Books/BookCover";
import { useCart } from "../context/CartContext";
import { ui } from "../styles/ui";

export default function CartPage() {
  const {
    cart,
    cartCount,
    cartTotal,
    cartSubtotal,
    cartSavings,
    updateQuantity,
    removeFromCart,
  } = useCart();

  const getBookId = (book) => book._id ?? book.id;

  // Overall discount percentage for the entire cart
  const overallDiscountPercent =
    cartSubtotal > 0 ? Math.round((cartSavings / cartSubtotal) * 100) : 0;

  return (
    <main className={ui.page}>
      <Header subtitle="Shopping Cart" logoutRedirectTo="/books" />

      <div className={ui.pageTopSpace}>
        <div className={ui.homeContainer}>
          {cart.length === 0 ? (
            <div className={ui.card}>
              <div
                className={`${ui.cardBody} flex flex-col items-center gap-4 py-16`}
              >
                <div className={ui.cartEmptyIcon}>
                  <ShoppingCart size={40} />
                </div>
                <h1 className={ui.sectionTitle}>Your cart is empty</h1>
                <p className={ui.sectionSub}>
                  Browse our collection and add your favorite books.
                </p>
                <Link to="/books" className={ui.primaryBtn}>
                  Continue shopping
                </Link>
              </div>
            </div>
          ) : (
            <>
              <h1 className={`${ui.sectionTitle} mb-6 text-2xl`}>
                Shopping Cart ({cartCount} {cartCount === 1 ? "item" : "items"})
              </h1>

              <div className={ui.cartLayout}>
                <div className={ui.cartItems}>
                  {cart.map(({ book, quantity }) => {
                    const finalPrice = book.price ?? 0;
                    const originalPrice = book.originalPrice ?? finalPrice;
                    const hasDiscount = originalPrice > finalPrice;
                    const itemDiscount = hasDiscount
                      ? Math.round(
                          ((originalPrice - finalPrice) / originalPrice) * 100,
                        )
                      : 0;

                    return (
                      <div key={getBookId(book)} className={ui.cartItem}>
                        <div className={ui.cartItemCover}>
                          <BookCover
                            image={book.bookImage}
                            title={book.title}
                            size="sm"
                          />
                        </div>

                        <div className={ui.cartItemInfo}>
                          <h3 className={ui.cartItemTitle}>{book.title}</h3>
                          <p className={ui.cartItemSub}>{book.author}</p>

                          {/* Price logic for individual cart item */}
                          <div className="mt-1 flex items-center gap-2">
                            <span className={ui.cartItemPrice}>
                              ${finalPrice.toFixed(2)}
                            </span>
                            {hasDiscount && (
                              <>
                                <span className="text-xs text-slate-400 line-through dark:text-slate-500">
                                  ${originalPrice.toFixed(2)}
                                </span>
                                <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                                  -{itemDiscount}%
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        <div className={ui.cartQtyControl}>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(getBookId(book), quantity - 1)
                            }
                            className={ui.cartQtyBtn}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className={ui.cartQtyValue}>{quantity}</span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(getBookId(book), quantity + 1)
                            }
                            className={ui.cartQtyBtn}
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(getBookId(book))}
                          className={ui.cartRemoveBtn}
                          aria-label="Remove item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Summary */}
                <aside className={ui.cartSummary}>
                  <h2 className={`${ui.sectionTitle} mb-3`}>Order Summary</h2>

                  <div className={ui.cartSummaryRow}>
                    <span className={ui.sectionSub}>Subtotal</span>
                    <span className={ui.cartSummaryValue}>
                      ${cartSubtotal.toFixed(2)}
                    </span>
                  </div>

                  {/* Show Discount in Summary */}
                  {cartSavings > 0 && (
                    <div className={ui.cartSummaryRow}>
                      <span className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        Discount
                        <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                          -{overallDiscountPercent}%
                        </span>
                      </span>
                      <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                        -${cartSavings.toFixed(2)}
                      </span>
                    </div>
                  )}

                  <div className={ui.cartSummaryRow}>
                    <span className={ui.sectionSub}>Shipping</span>
                    <span className={ui.cartSummaryValue}>Free</span>
                  </div>

                  <div
                    className={`${ui.cartSummaryRow} ${ui.cartSummaryTotal}`}
                  >
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>

                  <button
                    type="button"
                    className={`${ui.primaryBtn} mt-4 w-full`}
                  >
                    Checkout
                  </button>
                  <Link to="/books" className={`${ui.ghostBtn} mt-2 w-full`}>
                    Continue shopping
                  </Link>
                </aside>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
