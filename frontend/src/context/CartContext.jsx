import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "lixy_cart";

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const getBookId = (book) => book?._id ?? book?.id;

  function addToCart(book, quantity = 1) {
    setCart((prev) => {
      const id = getBookId(book);
      const existing = prev.find((item) => getBookId(item.book) === id);
      if (existing) {
        return prev.map((item) =>
          getBookId(item.book) === id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { book, quantity }];
    });
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((item) => getBookId(item.book) !== id));
  }

  function updateQuantity(id, quantity) {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        getBookId(item.book) === id ? { ...item, quantity } : item
      )
    );
  }

  function clearCart() {
    setCart([]);
  }

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  // The final price the user pays (uses discountedPrice if available)
  const cartTotal = useMemo(
    () =>
      cart.reduce(
        (sum, item) =>
          sum + (item.book.discountedPrice ?? item.book.price ?? 0) * item.quantity,
        0
      ),
    [cart]
  );

  // Subtotal based on original price (before discounts)
  const cartSubtotal = useMemo(
    () =>
      cart.reduce(
        (sum, item) => sum + (item.book.price ?? 0) * item.quantity,
        0
      ),
    [cart]
  );

  // Money saved from discounts
  const cartSavings = useMemo(
    () => cartSubtotal - cartTotal,
    [cartSubtotal, cartTotal]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        cartSubtotal,
        cartSavings,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}